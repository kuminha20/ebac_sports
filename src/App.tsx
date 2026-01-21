import { useDispatch, useSelector } from 'react-redux'
import { useGetProdutosQuery } from './redux/services/api'
import { adicionarAoCarrinho } from './redux/slices/carrinhoSlice'
import {
  adicionarAosFavoritos,
  removerDosFavoritos
} from './redux/slices/favoritosSlice'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'
import { RootState } from './redux/store'
import type { Produto } from './redux/services/api'

export type { Produto }

function App() {
  const dispatch = useDispatch()
  const carrinho = useSelector((state: RootState) => state.carrinho.itens)
  const favoritos = useSelector((state: RootState) => state.favoritos.itens)
  const { data: produtos = [] } = useGetProdutosQuery()

  function handleAdicionarAoCarrinho(produto: Produto) {
    if (carrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(adicionarAoCarrinho(produto))
    }
  }

  function handleFavoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      dispatch(removerDosFavoritos(produto.id))
    } else {
      dispatch(adicionarAosFavoritos(produto))
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={handleFavoritar}
          adicionarAoCarrinho={handleAdicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
