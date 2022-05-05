export const isMobileW = () => window.innerWidth < 768
export const isAlmostMobileW = () => window.innerWidth < 992

export enum BreakPoint {
    SM_MINIMUM,
    SM,
    MD,
    LG,
    XL,
    XXL,
    WIDE,
    MORE_THAN_WIDE,
}

export function currentBP(): BreakPoint {
    if (window.innerWidth <= 375) {
        return BreakPoint.SM_MINIMUM
    } else if (window.innerWidth <= 576) {
        return BreakPoint.SM
    } else if (window.innerWidth <= 768) {
        return BreakPoint.MD
    } else if (window.innerWidth <= 992) {
        return BreakPoint.LG
    } else if (window.innerWidth <= 1200) {
        return BreakPoint.XL
    } else if (window.innerWidth <= 1600) {
        return BreakPoint.XXL
    } else if (window.innerWidth <= 1920) {
        return BreakPoint.WIDE
    } else return BreakPoint.MORE_THAN_WIDE
}

