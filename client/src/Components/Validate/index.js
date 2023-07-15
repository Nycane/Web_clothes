import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function Validate(options={},optionsForm={}) {
    const schema = yup
    .object({
        ...options,
      
    })
    .required();
    const method = useForm({
        resolver: yupResolver(schema),
        ...optionsForm
    });
    return method;
}

export default Validate;
