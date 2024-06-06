import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Cria um contexto para os cartões de estudo
const StudyCardsContext = createContext()

// Provedor do contexto que envolverá os componentes filhos
export const StudyCardsProvider = ({ children }) => {
    // Estado para armazenar os cartões de estudo
    const [cards, setCards] = useState([])

    // Hook para carregar os cartões ao montar o componente
    useEffect(() => {
        loadCards()
    }, [])

    // Função para carregar os cartões do AsyncStorage
    const loadCards = async () => {
        //await AsyncStorage.clear(); // Linha comentada para limpar o armazenamento, se necessário
        //console.log('AsyncStorage was cleared successfully!'); // Linha comentada para depuração
        const storedCards = await AsyncStorage.getItem('cards') // Recupera os cartões armazenados
        if (storedCards) setCards(JSON.parse(storedCards)) // Atualiza o estado se houver cartões armazenados
    }

    // Função para adicionar um novo cartão
    const addCard = async (card) => {
        const newCards = [...cards, { ...card, id: Date.now() }] // Cria um novo array com o cartão adicionado
        setCards(newCards) // Atualiza o estado com o novo array de cartões
        await AsyncStorage.setItem('cards', JSON.stringify(newCards)) // Armazena o novo array no AsyncStorage
    }

    // Função para atualizar um cartão existente
    const updateCard = async (id, updates) => {
        const newCards = cards.map(card => card.id === id ? {
            ...card, ...updates
        } : card) // Cria um novo array atualizando o cartão correspondente
        setCards(newCards) // Atualiza o estado com o novo array de cartões
        await AsyncStorage.setItem('cards', JSON.stringify(newCards)) // Armazena o novo array no AsyncStorage
    }

    // Função para deletar um cartão
    const deleteCard = async (id) => {
        const newCards = cards.filter(card => card.id !== id) // Cria um novo array excluindo o cartão correspondente
        setCards(newCards) // Atualiza o estado com o novo array de cartões
        await AsyncStorage.setItem('cards', JSON.stringify(newCards)) // Armazena o novo array no AsyncStorage
    }

    // Retorna o provedor do contexto com os valores e funções disponíveis para os componentes filhos
    return (
        <StudyCardsContext.Provider value={{ cards, addCard, updateCard, deleteCard }}>
            {children}
        </StudyCardsContext.Provider>
    )
}

// Exporta o contexto para ser utilizado em outros componentes
export default StudyCardsContext
