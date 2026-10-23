export type ContactFormData = {
  name: string;
  email: string;
  category: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFormData, string>>;

export const emptyContactForm: ContactFormData = {
  name: '',
  email: '',
  category: 'Webサイト制作について',
  message: '',
};

export function validateContactForm(values: ContactFormData): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name.trim()) {
    errors.name = 'お名前を入力してください。';
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = 'メールアドレスを入力してください。';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'メールアドレスの形式を確認してください。';
  }

  if (values.message.trim().length < 10) {
    errors.message = 'お問い合わせ内容を10文字以上で入力してください。';
  }

  return errors;
}
