/** Route paths — all prefixed with /mobility- (except shared /mobility-home style names) */
export const MOBILITY = {
  LOGIN: "/mobility-login",
  REGISTER: "/mobility-user-registration",
  SELF_INITIATION: "/mobility-self-initiation",
  SELF_PRE_CONFIRM: "/mobility-self-pre-confirm",
  SELF_CONFIRM: "/mobility-self-confirm",
  PAYMENT_MENU: "/mobility-payment",
  FORGOT_PASSWORD: "/mobility-forgot-password",
  HOME: "/mobility-home",
  PAYMENTS: "/mobility-payments",
  USER_PROFILE: "/mobility-user-profile",
  authorizePreConfirm: (ref) => `/mobility-authorize-pre-confirm/${ref}`,
  rejectPreConfirm: (ref) => `/mobility-reject-pre-confirm/${ref}`,
  FILE_UPLOAD: "/mobility-file-upload",
  fileVerify: (ref) => `/mobility-file-verify/${ref}`,
  fileRejectPreConfirm: (ref) =>
    `/mobility-file-reject-pre-confirm/${ref}`,
  authorizeConfirmation: (ref) =>
    `/mobility-authorize-confirmation/${ref}`,
  rejectConfirmation: (ref) => `/mobility-reject-confirmation/${ref}`,
  fileVerifyConfirmation: (ref) =>
    `/mobility-file-verify-confirmation/${ref}`,
  fileVerifyRejectConfirmation: (ref) =>
    `/mobility-file-verify-reject-confirmation/${ref}`,
  qrCode: (ref) => `/mobility-qr-code/${ref}`,
};
