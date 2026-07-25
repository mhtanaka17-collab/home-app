import { useAuth } from '../contexts/AuthContext'

// ダミーの物件データ（本来はSupabaseのテーブルなどから取得する）
const DUMMY_PROPERTIES = [
  { id: 1, name: 'サンシャイン第一マンション101', rent: '85,000円', area: '東京都渋谷区' },
  { id: 2, name: 'グリーンハイツ202', rent: '72,000円', area: '東京都世田谷区' },
  { id: 3, name: 'パークサイド青葉303', rent: '110,000円', area: '神奈川県横浜市' },
  { id: 4, name: 'コーポ桜台105', rent: '58,000円', area: '埼玉県さいたま市' },
  { id: 5, name: 'メゾン・ド・フルール201', rent: '95,000円', area: '東京都杉並区' },
  { id: 6, name: 'リバーサイド栄401', rent: '130,000円', area: '愛知県名古屋市' },
]

function Properties() {
  const { user, signOut } = useAuth()

  return (
    <div className="properties-page">
      <header className="properties-header">
        <div>
          <h1>物件一覧</h1>
          {user && <p className="user-email">{user.email}</p>}
        </div>
        <button type="button" className="logout-button" onClick={signOut}>
          ログアウト
        </button>
      </header>

      <div className="property-grid">
        {DUMMY_PROPERTIES.map((property) => (
          <div className="property-card" key={property.id}>
            <h2>{property.name}</h2>
            <p className="rent">{property.rent} / 月</p>
            <p className="area">{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Properties
