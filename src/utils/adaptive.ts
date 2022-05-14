export const isMobileW = (width: number = window.innerWidth) => currentBP(width) <= BreakPoint.MD
export const isAlmostMobileW = (width: number = window.innerWidth) => currentBP(width) <= BreakPoint.LG

export enum BreakPoint {
    SM_MINIMUM,     // 375px
    SM,             // 576px
    MD,             // 768px
    LG,             // 992px
    XL,             // 1200px
    XXL,            // 1600px
    WIDE,           // 1920px
    MORE_THAN_WIDE, // inf
}

export function currentBP(width: number = window.innerWidth): BreakPoint {
    if (width < 375) {
        return BreakPoint.SM_MINIMUM
    } else if (width < 576) {
        return BreakPoint.SM
    } else if (width < 768) {
        return BreakPoint.MD
    } else if (width < 992) {
        return BreakPoint.LG
    } else if (width < 1200) {
        return BreakPoint.XL
    } else if (width < 1600) {
        return BreakPoint.XXL
    } else if (width < 1920) {
        return BreakPoint.WIDE
    } else return BreakPoint.MORE_THAN_WIDE
}

