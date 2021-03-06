import styled from 'styled-components';

export const Container = styled.nav`
    display: flex;
    justify-content: center;
    gap: 50px;
    padding: 20px 0;

    a{
        text-decoration: none;
    }
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 28px;
    text-align: center;
    color: #003957;
    gap: 8px;
    cursor: pointer;
    transition: filter 250ms ease;

    &:hover{
        filter: brightness(1.5);
    }

    span{
        color: #003957;
        font-size: 12px;
    }
`;
