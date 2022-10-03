import styled from "@emotion/styled"

export default {
    Vertical: styled.div<{ height: number }>`
    height: ${({ height }) => height}px;
  `,
    Horizontal: styled.div<{ width: number }>`
    width: ${({ width }) => width}px;
  `,
};
