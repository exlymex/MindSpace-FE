import {StyleSheet} from 'react-native';
import {AppTheme} from '@/theme';

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
        paddingBottom: theme.scale(30),
        height: '90%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.scale(16),
        paddingVertical: theme.scale(10),
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.ezGrayBackground,
    },
    title: {
        textAlign: 'center',
    },
    stepContainer: {
        flex: 1,
        padding: theme.scale(16),
    },
    psychologistsList: {
        paddingBottom: theme.scale(20),
    },
    psychologistCard: {
        marginBottom: theme.scale(12),
        borderRadius: theme.scale(10),
        elevation: 2,
    },
    selectedPsychologistCard: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
    },
    bio: {
        marginTop: theme.scale(4),
        color: theme.colors.ezGrayDark,
    },
    psychologistInfo: {
        marginBottom: theme.scale(20),
        padding: theme.scale(12),
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: theme.scale(10),
    },
    sectionTitle: {
        marginBottom: theme.scale(10),
    },
    dateContainer: {
        marginBottom: theme.scale(20),
    },
    calendarContainer: {
        marginTop: theme.scale(10),
        marginBottom: theme.scale(10),
    },
    dateButton: {
        borderWidth: 1,
        borderColor: theme.colors.ezGrayBackground,
        borderRadius: theme.scale(8),
        padding: theme.scale(8),
        marginTop: theme.scale(8),
        marginBottom: theme.scale(16),
    },
    dateButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dateIcon: {
        margin: 0,
        padding: 0,
    },
    dateText: {
        flex: 1,
        textAlign: 'center',
    },
    daysContainer: {
        paddingVertical: theme.scale(8),
    },
    dayItem: {
        width: theme.scale(60),
        height: theme.scale(80),
        borderRadius: theme.scale(8),
        marginRight: theme.scale(8),
        padding: theme.scale(8),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.surface,
        elevation: 2,
    },
    selectedDayItem: {
        backgroundColor: theme.colors.primary,
    },
    todayItem: {
        borderWidth: 1,
        borderColor: theme.colors.ezPrimary,
    },
    dayName: {
        textTransform: 'uppercase',
        marginBottom: theme.scale(4),
    },
    dayNumber: {
        fontSize: theme.scale(18),
        marginBottom: theme.scale(2),
    },
    monthName: {
        textTransform: 'uppercase',
    },
    selectedDayText: {
        color: theme.colors.onPrimary,
    },
    selectedDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surfaceVariant,
        padding: theme.scale(10),
        borderRadius: theme.scale(8),
        marginTop: theme.scale(10),
    },
    selectedDateText: {
        flex: 1,
    },
    timeSlotsContainer: {
        marginBottom: theme.scale(20),
    },
    timeSlotsContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    timeSlotChip: {
        margin: theme.scale(4),
        backgroundColor: theme.colors.surface,
    },
    selectedTimeSlotChip: {
        backgroundColor: theme.colors.primary,
    },
    disabledTimeSlotChip: {
        backgroundColor: theme.colors.surfaceDisabled,
    },
    timeSlotText: {
        color: theme.colors.ezGrayDark,
    },
    selectedTimeSlotText: {
        color: theme.colors.onPrimary,
    },
    durationContainer: {
        marginBottom: theme.scale(20),
    },
    durationContent: {
        paddingVertical: theme.scale(8),
    },
    durationChip: {
        marginRight: theme.scale(8),
        backgroundColor: theme.colors.surface,
    },
    selectedDurationChip: {
        backgroundColor: theme.colors.primary,
    },
    durationText: {
        color: theme.colors.ezGrayDark,
    },
    selectedDurationText: {
        color: theme.colors.onPrimary,
    },
    nextButton: {
        marginTop: theme.scale(16),
    },
    submitButton: {
        marginTop: theme.scale(20),
    },
    scrollContent: {
        paddingBottom: theme.scale(30),
    },
    specialization: {
        color: theme.colors.ezGrayDark,
        marginTop: theme.scale(4),
    },
    experience: {
        color: theme.colors.ezGrayDark,
        marginTop: theme.scale(4),
    },
}); 