import React from "react";
import "../index.css";

function LanguageFilterItem(props) {
  const { langOptions, activeLanguage, clickActiveLanguage } = props;
  const { language } = langOptions;
  const activeButtonId = activeLanguage ? "active-button-id" : null;

  const onClickLangButton = () => {
    clickActiveLanguage(langOptions.id);
    // console.log(langOptions.id);
  };

  return (
    <button
      className={`${activeButtonId} language-item-button`}
      onClick={onClickLangButton}
    >
      <p className="language-item-lang-text">{language}</p>
    </button>
  );
}

export default LanguageFilterItem;
