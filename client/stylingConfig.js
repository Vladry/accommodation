const bordersGlobalColor = '#660000';
const bordersGlobalRadius = '5px';


export default {
    labels: {
        fontSize: '0.9em',
        fontWeight: '500',
        color: '#0f3c4c',
    },
    formItem: {
        border: `2px solid ${bordersGlobalColor}`,
        borderRadius: `${bordersGlobalRadius}`,
        blockMargin: '10px 2px 1px 2px',
        selectTopMargin: '8px',
        minHeight: '60px',
    },
    selectButton: {m: '1px', p: '4px', fontSize: '0.8em', fontWeight: '400', textTransform: 'none'},
}

/*
${props => props.theme.palette.primary.main}
${props => props.theme.palette.success.dark}*/