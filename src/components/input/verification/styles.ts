import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --input-ver-code-itemWidth: 50px;
        --input-ver-code-itemHeight: 60px;
        --input-ver-code-itemSpacing: 0;
    }
`;

interface ContainerProps {
    itemsCount: number;
}

export const Container = styled.div<ContainerProps>`
    //display: flex;
    //position: relative;
    //justify-content: center;
    width: ${({ itemsCount }) =>
        `calc(
      var(--input-ver-code-itemWidth) * ${itemsCount}
      + var(--input-ver-code-itemSpacing) * (${itemsCount} - 1)
    )`};
`;

interface InputProps {
    activeIndex: number;
}

export const Input = styled.input<InputProps>`
    //position: absolute;
    //top: 0;
    left: ${({ activeIndex }) =>
        `calc(
      var(--input-ver-code-itemWidth) * ${activeIndex}
      + var(--input-ver-code-itemSpacing) * ${activeIndex}
    )`};
    opacity: 0;
    //width: var(--input-ver-code-itemWidth);
    //height: var(--input-ver-code-itemHeight);
    width: 0;
    height: 0;
`;

export const Item = styled.div`
    width: var(--input-ver-code-itemWidth);
    height: var(--input-ver-code-itemHeight);
    display: inline-block;
    padding: 0;
    border-radius: 0;
    font-size: 1.5rem;
    font-weight: 800;
    line-height: var(--input-ver-code-itemHeight);
    text-align: center;
    border: 0;
    box-shadow: inset 0 0 0 1px #ccc;
    transition: box-shadow 0.2s ease-out;

    &.is-active {
        box-shadow: inset 0 0 0 2px #888;
    }
`;
