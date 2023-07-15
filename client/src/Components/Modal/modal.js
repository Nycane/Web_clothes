import classNames from 'classnames/bind';
import Modal from 'react-modal';
import styles from './modal.module.scss';
const cx = classNames.bind(styles);
function CustomModal(props) {
    return (
        <Modal
            appElement={document.getElementById('root')}
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            className={cx('modal',{
                [props.customCss]:props.customCss
            })}
            overlayClassName={cx('overlay')}
        >
            {props.children}
           {props.closed && <button className={cx('btn-close')} onClick={props.closeModal}>X</button>}
        </Modal>
    );
}

export default CustomModal;
