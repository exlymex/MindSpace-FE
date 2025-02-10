import {IListOption} from '@/types/custom';

export const getActiveItemLabel = (value: string | number, items: IListOption[]) => {
    const activeItemLabel = items.find(item => item.value === value)?.label;
    return activeItemLabel || '';
};
