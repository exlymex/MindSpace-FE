import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) => StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: theme.scale(20),
        borderTopRightRadius: theme.scale(20),
        paddingBottom: theme.scale(34),
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.scale(16),
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.ezGrayBackground,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        marginRight: theme.scale(40),
    },
    form: {
        padding: theme.scale(16),
    },
    input: {
        marginBottom: theme.scale(16),
    },
    dateButton: {
        borderWidth: 1,
        borderColor: theme.colors.ezGrayLight,
        borderRadius: theme.scale(8),
        padding: theme.scale(16),
        marginBottom: theme.scale(16),
    },
    timeButton: {
        borderWidth: 1,
        borderColor: theme.colors.ezGrayLight,
        borderRadius: theme.scale(8),
        padding: theme.scale(16),
        marginBottom: theme.scale(16),
    },
    submitButton: {
        marginTop: theme.scale(16),
    },
    psychologistButton: {
        borderWidth: 1,
        borderColor: theme.colors.ezGrayLight,
        borderRadius: theme.scale(8),
        padding: theme.scale(16),
        marginBottom: theme.scale(16),
    },
}); 