import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../services/api'

interface FavoritosState {
  itens: Produto[]
}

const initialState: FavoritosState = {
  itens: []
}

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    adicionarAosFavoritos: (state, action: PayloadAction<Produto>) => {
      const produtoExistente = state.itens.find(
        (p) => p.id === action.payload.id
      )
      if (!produtoExistente) {
        state.itens.push(action.payload)
      }
    },
    removerDosFavoritos: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((p) => p.id !== action.payload)
    }
  }
})

export const { adicionarAosFavoritos, removerDosFavoritos } =
  favoritosSlice.actions
export default favoritosSlice.reducer
