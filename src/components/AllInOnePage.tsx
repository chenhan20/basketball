import type { MatchupData } from '../App';

// 直接複用 App.tsx 內部 slide 元件
// 注意：這裡假設 S1~S10 都是命名導出（若不是，需調整）
import { S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 } from '../App';

export default function AllInOnePage({ m }: { m: MatchupData }) {
  return (
    <div className="all-in-one-page">
      <S1 m={m} />
      <S2 />
      <S3 m={m} />
      <S4 />
      <S5 />
      <S6 />
      <S7 />
      <S8 m={m} />
      <S9 m={m} />
      <S10 m={m} />
    </div>
  );
}
