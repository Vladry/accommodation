import styled from "@emotion/styled";
import stylingConfig from "../stylingConfig";

const FormItem = styled.div`
max-width: 400px;
border: ${stylingConfig.formItem.border};
border-radius: ${stylingConfig.formItem.borderRadius};
margin: ${stylingConfig.formItem.blockMargin};
min-height: ${stylingConfig.formItem.minHeight};
`;

const Label = styled.label`
font-size: ${stylingConfig.labels.fontSize};
font-weight: ${stylingConfig.labels.fontWeight};
color: ${stylingConfig.labels.color};
`;


export {
    FormItem,
    Label,
};