import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, Mail, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { emptyContactForm, validateContactForm, type ContactErrors, type ContactFormData } from '../lib/contact';

const categories = ['Webサイト制作について', 'デザイン・UIについて', '公開・運用について', 'その他'];
const API_ENDPOINT = '/api/contact';

export default function ContactPage() {
  const [values, setValues] = useState<ContactFormData>({ ...emptyContactForm });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [confirming, setConfirming] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  const update = (field: keyof ContactFormData, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setConfirming(true);
    }
  };

  const handleConfirmSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setTurnstileError(null);

    try {
      // Get Turnstile token from the widget
      const turnstileToken = (window as any).turnstile?.getResponse?.() || '';
      
      if (!turnstileToken) {
        setTurnstileError('Turnstile verification required. Please complete the challenge.');
        setSubmitting(false);
        return;
      }

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: values, turnstileToken }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setTurnstileError(result.error || '送信に失敗しました。もう一度お試しください。');
        // Reset Turnstile widget for retry
        (window as any).turnstile?.reset?.();
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      setConfirming(false);
    } catch {
      setTurnstileError('ネットワークエラーが発生しました。もう一度お試しください。');
      (window as any).turnstile?.reset?.();
      setSubmitting(false);
    }
  };

  const goBack = () => {
    setConfirming(false);
    setSubmitted(false);
    setTurnstileError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setValues({ ...emptyContactForm });
    setErrors({});
    setConfirming(false);
    setSubmitted(false);
    setSubmitting(false);
    setTurnstileError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <main className="inner-page">
    <div className="inner-hero"><div className="container"><div className="breadcrumbs"><Link to="/">ホーム</Link><span>/</span><span>お問い合わせ</span></div><span className="kicker">CONTACT</span><h1>お問い合わせ</h1><p>作りたいWebのイメージや相談したいことを入力してください。</p></div></div>
    <div className="container inner-content">
      {submitted && <div className="notice notice--success" role="status"><Check size={17} /><p>お問い合わせありがとうございます。内容を確認の上、ご連絡いたします。</p></div>}
      {!confirming && !submitted ? (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-topline"><p>ご相談内容を入力してください。</p><span><b>*</b> 必須項目</span></div>
          <label className="form-field">お名前 <b>*</b><input name="name" autoComplete="name" value={values.name} onChange={(event) => update('name', event.target.value)} placeholder="例：山田 太郎" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <small id="name-error" className="field-error">{errors.name}</small>}</label>
          <label className="form-field">メールアドレス <b>*</b><input name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update('email', event.target.value)} placeholder="example@email.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <small id="email-error" className="field-error">{errors.email}</small>}</label>
          <label className="form-field">お問い合わせ種別<select name="category" value={values.category} onChange={(event) => update('category', event.target.value)}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
          <label className="form-field">お問い合わせ内容 <b>*</b><textarea name="message" rows={6} value={values.message} onChange={(event) => update('message', event.target.value)} placeholder="相談したいことや、作りたいサイトのイメージを入力してください。" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <small id="message-error" className="field-error">{errors.message}</small>}<span className="field-hint">10文字以上で入力してください。</span></label>
          <button className="button button--primary form-submit" type="submit">入力内容を確認する <ArrowRight size={16} /></button>
        </form>
      ) : !submitted ? (
        <form className="confirmation-form" onSubmit={handleConfirmSubmit}>
          <section className="confirmation-card" aria-labelledby="confirmation-title">
            <div className="confirmation-heading"><span><Check size={22} /></span><div><span className="kicker">REVIEW YOUR MESSAGE</span><h2 id="confirmation-title">入力内容の確認</h2></div></div>
            <p className="confirmation-description">送信前の確認画面です。内容を確認し、必要があれば前の画面へ戻って修正してください。</p>
            <dl className="confirmation-list"><dt>お名前</dt><dd>{values.name}</dd><dt>メールアドレス</dt><dd>{values.email}</dd><dt>お問い合わせ種別</dt><dd>{values.category}</dd><dt>お問い合わせ内容</dt><dd className="confirmation-message">{values.message}</dd></dl>
            <div className="turnstile-container" style={{ marginTop: '20px' }}>
              <div 
                className="cf-turnstile" 
                data-sitekey="0x4AAAAAAFiJ1aAmBs3sxMvX" 
                data-action="contact"
                data-theme="light"
              ></div>
              {turnstileError && <p className="field-error" style={{ marginTop: '8px', color: '#c34e5a' }}>{turnstileError}</p>}
            </div>
            <div className="confirmation-actions">
              <button type="button" className="button button--secondary" onClick={goBack}><ArrowLeft size={15} /> 内容を修正する</button>
              <button type="submit" className="button button--primary" disabled={submitting}>
                {submitting ? <><Loader2 size={15} className="animate-spin" /> 送信中...</> : <><Mail size={15} /> 送信する</>}
              </button>
            </div>
          </section>
        </form>
      ) : (
        <div className="confirmation-card" aria-labelledby="complete-title">
          <div className="confirmation-heading"><span><Check size={22} /></span><div><span className="kicker">COMPLETE</span><h2 id="complete-title">送信完了</h2></div></div>
          <p className="confirmation-description">お問い合わせありがとうございます。内容を確認の上、ご連絡いたします。</p>
          <button className="button button--primary" onClick={resetForm}><ArrowLeft size={15} /> もう一度問い合わせる</button>
        </div>
      )}
    </div>
  </main>;
}