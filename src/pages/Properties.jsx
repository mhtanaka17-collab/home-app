import { useEffect, useState } from 'react'
import {
  createProperty,
  deleteProperty,
  fetchProperties,
  updateProperty,
} from '../api/properties'
import PropertyForm from '../components/PropertyForm'
import { useAuth } from '../contexts/AuthContext'

function Properties() {
  const { user, signOut } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // 物件一覧を取得する（RLSにより自分の物件のみ返る）
  const loadProperties = async () => {
    setLoading(true)
    setErrorMessage('')
    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch (error) {
      setErrorMessage(`物件の取得に失敗しました: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [])

  // 物件の新規登録
  const handleCreate = async (values) => {
    await createProperty({ ...values, userId: user.id })
    setShowCreateForm(false)
    await loadProperties()
  }

  // 物件の更新
  const handleUpdate = async (id, values) => {
    await updateProperty(id, values)
    setEditingId(null)
    await loadProperties()
  }

  // 物件の削除
  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) return
    try {
      await deleteProperty(id)
      await loadProperties()
    } catch (error) {
      setErrorMessage(`物件の削除に失敗しました: ${error.message}`)
    }
  }

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

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="properties-toolbar">
        <button type="button" onClick={() => setShowCreateForm((prev) => !prev)}>
          {showCreateForm ? '閉じる' : '＋ 物件を登録'}
        </button>
      </div>

      {showCreateForm && (
        <PropertyForm
          submitLabel="登録する"
          onSubmit={handleCreate}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {loading ? (
        <p className="loading-text">読み込み中...</p>
      ) : properties.length === 0 ? (
        <p className="empty-text">登録された物件がありません。</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) =>
            editingId === property.id ? (
              <div className="property-card" key={property.id}>
                <PropertyForm
                  initialValues={property}
                  submitLabel="更新する"
                  onSubmit={(values) => handleUpdate(property.id, values)}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div className="property-card" key={property.id}>
                <h2>{property.name}</h2>
                <p className="rent">{property.rent.toLocaleString()}円 / 月</p>
                <p className="area">{property.area}</p>
                <p className="layout">{property.layout}</p>
                <div className="property-card-actions">
                  <button type="button" onClick={() => setEditingId(property.id)}>
                    編集
                  </button>
                  <button type="button" onClick={() => handleDelete(property.id)}>
                    削除
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  )
}

export default Properties
