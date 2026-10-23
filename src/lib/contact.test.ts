import { describe, expect, it } from 'vitest';
import { emptyContactForm, validateContactForm, type ContactFormData } from './contact';

const validForm: ContactFormData = {
  name: '山田 太郎',
  email: 'hello@example.com',
  category: 'Webサイト制作について',
  message: 'サービス紹介サイトの制作について相談したいです。',
};

describe('validateContactForm', () => {
  it('requires a name, valid email address and a message of at least ten characters', () => {
    const errors = validateContactForm(emptyContactForm);
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  it('rejects an invalid email address', () => {
    const errors = validateContactForm({ ...validForm, email: 'not-an-email' });
    expect(errors.email).toContain('形式');
  });

  it('rejects a too-short message', () => {
    const errors = validateContactForm({ ...validForm, message: '相談です' });
    expect(errors.message).toContain('10文字以上');
  });

  it('accepts valid input', () => {
    expect(validateContactForm(validForm)).toEqual({});
  });
});
