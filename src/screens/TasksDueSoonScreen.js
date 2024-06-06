import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import StudyCardsContext from '../contexts/StudyCardsContext'

// Componente que exibe as tarefas a vencer nos próximos 15 dias
const TasksDueSoonScreen = () => {

    // Acessa o contexto de StudyCards para obter os cartões
    const { cards } = useContext(StudyCardsContext)

    // Calcula a data atual para comparar com as datas de vencimento dos cartões
    const today = new Date()
    const dueSoonCards = cards.filter(card => {
        const dueDate = new Date(card.dueDate)
        const diffInDays = (dueDate - today) / (1000 * 60 * 60 * 24)
        return diffInDays >= 0 && diffInDays <= 15
    })

    // Função que renderiza cada cartão
    const renderCard = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Data/Hora Término: {new Date(item.dueDate).toLocaleString()}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            {/* Título da tela */}
            <Text style={styles.header}>Tasks a Vencer nos Próximos 15 Dias</Text>

            {/* Lista de cartões a vencer */}
            <FlatList
                data={dueSoonCards}
                keyExtractor={item => item.id.toString()}
                renderItem={renderCard}
            />
        </View>
    )
}

// Estilos dos componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f8ff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        margin: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default TasksDueSoonScreen
