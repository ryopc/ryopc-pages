import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { emptyContactForm, validateContactForm, type ContactErrors, type ContactFormData } from '../lib/contact';

const categories = ['Webサイト制作について', 'デザイン・UIについて', '公開・運用について', 'その他'];

export default function ContactPage() {
  const [values, setValues] = useState<ContactFormData>({ ...emptyContactForm });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [confirming, setConfirming] = useState(false);
  const [reviewed, setReviewed] = useState(false);

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
      setReviewed(false);
    }
  };

  const finishMock = () => {
    setValues({ ...emptyContactForm });
    setErrors({});
    setConfirming(false);
    setReviewed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <main className="inner-page">
    <div className="inner-hero"><div className="container"><div className="breadcrumbs"><Link to="/">ホーム</Link><span>/</span><span>お問い合わせ</span></div><span className="kicker">CONTACT</span><h1>お問い合わせ</h1><p>作りたいWebのイメージや相談したいことを入力してください。</p></div></div>
    <div className="container inner-content">
      {reviewed && <div className="notice notice--success" role="status"><Check size={17} /><p>確認デモを終了しました。入力内容は保存・送信されていません。</p></div>}
      {!confirming ? <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-topline"><p>ご相談内容を入力してください。</p><span><b>*</b> 必須項目</span></div>
        <label className="form-field">お名前 <b>*</b><input name="name" autoComplete="name" value={values.name} onChange={(event) => update('name', event.target.value)} placeholder="例：山田 太郎" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <small id="name-error" className="field-error">{errors.name}</small>}</label>
        <label className="form-field">メールアドレス <b>*</b><input name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update('email', event.target.value)} placeholder="example@email.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <small id="email-error" className="field-error">{errors.email}</small>}</label>
        <label className="form-field">お問い合わせ種別<select name="category" value={values.category} onChange={(event) => update('category', event.target.value)}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label className="form-field">お問い合わせ内容 <b>*</b><textarea name="message" rows={6} value={values.message} onChange={(event) => update('message', event.target.value)} placeholder="相談したいことや、作りたいサイトのイメージを入力してください。" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <small id="message-error" className="field-error">{errors.message}</small>}<span className="field-hint">10文字以上で入力してください。</span></label>
        <div className="demo-disclaimer"><Info size={18} /><p>このフォームは動作確認用のモックです。確認画面まで操作できますが、実際の送信やデータの保存は行われません。</p></div>
        <button className="button button--primary form-submit" type="submit">入力内容を確認する <ArrowRight size={16} /></button>
      </form> : <section className="confirmation-card" aria-labelledby="confirmation-title">
        <div className="confirmation-heading"><span><Check size={22} /></span><div><span className="kicker">REVIEW YOUR MESSAGE</span><h2 id="confirmation-title">入力内容の確認</h2></div></div>
        <p className="confirmation-description">送信前の確認画面です。内容を確認し、必要があれば前の画面へ戻って修正してください。</p>
        <dl className="confirmation-list"><dt>お名前</dt><dd>{values.name}</dd><dt>メールアドレス</dt><dd>{values.email}</dd><dt>お問い合わせ種別</dt><dd>{values.category}</dd><dt>お問い合わせ内容</dt><dd className="confirmation-message">{values.message}</dd></dl>
        <div className="demo-disclaimer"><Info size={18} /><p>このモックには送信先が接続されていません。実際の問い合わせは送信されません。</p></div>
        <div className="confirmation-actions"><button type="button" className="button button--secondary" onClick={() => setConfirming(false)}><ArrowLeft size={15} /> 内容を修正する</button><button type="button" className="button button--primary" onClick={finishMock}>確認デモを終了する <Check size={15} /></button></div>
      </section>}
    </div>
  </main>;
}
