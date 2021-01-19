import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Confirm(props) {

    return (
        <Modal
            show={true}
            onHide={props.onClose}
            centered
            size="lg"
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                Are you sure delete {props.taskCount} task{props.taskCount > 1 ? "s" : ""}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={props.onConfirm}
                    variant="success"
                >
                    Ok
            </Button>
                <Button
                    variant="secondary"
                    onClick={props.onClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
Confirm.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    taskCount: PropTypes.number.isRequired
}

export default Confirm;