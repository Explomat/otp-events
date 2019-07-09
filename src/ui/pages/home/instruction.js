import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';

const Instruction = ({ instruction, onClose }) => {
	return (
		<Modal size='large' open closeIcon onClose={onClose} style={{
			position: 'relative'
		}}>
			<Modal.Header>Инструкция</Modal.Header>
			<Modal.Content  scrolling>
				<Modal.Description>
					<Segment basic dangerouslySetInnerHTML={{ __html: instruction }} />
				</Modal.Description>
			</Modal.Content>
		</Modal>
	);
}

export default Instruction;