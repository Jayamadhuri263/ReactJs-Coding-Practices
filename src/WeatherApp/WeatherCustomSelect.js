import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

function normalize(s) {
  const str = String(s ?? "").toLowerCase();
  try {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } catch {
    return str;
  }
}

/**
 * Custom combobox with optional search filter (native <select> cannot style options).
 */
export default function WeatherCustomSelect({
  value,
  onChange,
  options = [],
  disabled = false,
  loading = false,
  loadingLabel = "Loading…",
  placeholder = "Select…",
  searchable = true,
  searchPlaceholder = "Search…",
  id: idProp,
  "aria-busy": ariaBusy,
}) {
  const reactId = useId();
  const id = idProp || `weather-select-${reactId.replace(/:/g, "")}`;
  const listId = `${id}-listbox`;
  const searchId = `${id}-search`;

  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [filterQuery, setFilterQuery] = useState("");
  const [listPos, setListPos] = useState(null);

  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const searchInputRef = useRef(null);
  const listRef = useRef(null);

  const hasOptions = options.length > 0;
  const canOpen = !disabled && !loading && hasOptions;

  const filterLower = normalize(filterQuery.trim());

  const filteredOptions = useMemo(() => {
    if (!filterLower) return options;
    return options.filter((o) => {
      const lab = normalize(o.label);
      const val = normalize(o.value);
      return lab.includes(filterLower) || val.includes(filterLower);
    });
  }, [options, filterLower]);

  useEffect(() => {
    if (!open) return;
    if (filteredOptions.length === 0) {
      setHighlight(0);
      return;
    }
    const idx = filteredOptions.findIndex((o) => o.value === value);
    setHighlight(idx >= 0 ? idx : 0);
  }, [open, filterQuery, value, filteredOptions]);

  useEffect(() => {
    if (!open || !searchable) return;
    const idr = requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
    return () => cancelAnimationFrame(idr);
  }, [open, searchable]);

  useEffect(() => {
    if (!open) return;
    const el = document.getElementById(`${id}-opt-${highlight}`);
    el?.scrollIntoView({ block: "nearest", behavior: "auto" });
  }, [highlight, open, id]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      const t = e.target;
      if (wrapRef.current?.contains(t) || panelRef.current?.contains(t)) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !canOpen) {
      setListPos(null);
      return;
    }
    const update = () => {
      const el = triggerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setListPos({
        top: r.bottom + 6,
        left: r.left,
        width: r.width,
      });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, canOpen]);

  useEffect(() => {
    if (disabled || loading) setOpen(false);
  }, [disabled, loading]);

  const triggerLabel = loading
    ? loadingLabel
    : !hasOptions && !loading
      ? placeholder
      : value || placeholder;

  const toggle = useCallback(() => {
    if (!canOpen) return;
    setFilterQuery("");
    setOpen((o) => !o);
  }, [canOpen]);

  function selectOption(v) {
    onChange(v);
    setOpen(false);
    setFilterQuery("");
    triggerRef.current?.focus();
  }

  const onSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) =>
        filteredOptions.length === 0
          ? 0
          : Math.min(h + 1, filteredOptions.length - 1)
      );
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const opt = filteredOptions[highlight];
      if (opt) selectOption(opt.value);
    }
  };

  const onTriggerKeyDown = (e) => {
    if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
      }
      return;
    }

    if (open && filteredOptions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, filteredOptions.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const opt = filteredOptions[highlight];
        if (opt) selectOption(opt.value);
        return;
      }
    }

    if (!open) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      } else if (e.key === "ArrowDown" && canOpen) {
        e.preventDefault();
        setFilterQuery("");
        setOpen(true);
      }
    }
  };

  return (
    <div
      ref={wrapRef}
      className={`weather-app-custom-select ${open ? "is-open" : ""} ${
        disabled ? "is-disabled" : ""
      } ${loading ? "is-loading" : ""}`}
    >
      <button
        ref={triggerRef}
        type="button"
        id={id}
        className="weather-app-custom-select__trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-busy={ariaBusy || loading}
        onClick={toggle}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="weather-app-custom-select__value">{triggerLabel}</span>
        <span className="weather-app-custom-select__chevron" aria-hidden />
      </button>

      {open &&
        canOpen &&
        listPos &&
        createPortal(
          <div
            ref={panelRef}
            className="weather-app-custom-select__panel"
            style={{
              top: listPos.top,
              left: listPos.left,
              width: listPos.width,
            }}
          >
            {searchable && (
              <div className="weather-app-custom-select__search">
                <input
                  ref={searchInputRef}
                  id={searchId}
                  type="search"
                  className="weather-app-custom-select__search-input"
                  placeholder={searchPlaceholder}
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  onKeyDown={onSearchKeyDown}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-controls={listId}
                  aria-label={searchPlaceholder}
                />
              </div>
            )}

            <ul
              ref={listRef}
              id={listId}
              className="weather-app-custom-select__list"
              role="listbox"
              aria-label="Options"
            >
              {filteredOptions.length === 0 ? (
                <li
                  id={`${id}-opt-0`}
                  className="weather-app-custom-select__no-results"
                  role="option"
                  aria-selected={false}
                  aria-disabled="true"
                >
                  {filterLower ? "No matches" : "No options"}
                </li>
              ) : (
                filteredOptions.map((opt, i) => {
                  const selected = value === opt.value;
                  const isHi = i === highlight;
                  return (
                    <li
                      id={`${id}-opt-${i}`}
                      key={`${String(opt.value)}-${opt.label}`}
                      role="option"
                      aria-selected={selected}
                      className={
                        "weather-app-custom-select__option" +
                        (selected ? " is-selected" : "") +
                        (isHi ? " is-highlighted" : "")
                      }
                      onMouseEnter={() => setHighlight(i)}
                      onClick={() => selectOption(opt.value)}
                    >
                      <span
                        className="weather-app-custom-select__option-glow"
                        aria-hidden
                      />
                      <span className="weather-app-custom-select__option-text">
                        {opt.label}
                      </span>
                      {selected ? (
                        <span
                          className="weather-app-custom-select__check"
                          aria-hidden
                        >
                          ✓
                        </span>
                      ) : (
                        <span className="weather-app-custom-select__check-spacer" />
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
}
