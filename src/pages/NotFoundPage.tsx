import { ArrowLeft, House } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <main className="not-found container"><span className="not-found-code">404</span><h1>ページが見つかりません</h1><p>お探しのページは移動または削除されたか、URLが間違っている可能性があります。</p><div className="button-row"><Link className="button button--primary" to="/"><House size={16} /> トップページへ戻る</Link><Link className="button button--secondary" to="/works"><ArrowLeft size={16} /> 制作実績を見る</Link></div></main>;
}
