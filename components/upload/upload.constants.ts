import {UploadProps} from 'antd';

export const UPLOAD_PROPS: UploadProps = {
	name: 'file',
	multiple: true,
	beforeUpload:(data) => {
		return false
	},
	onDrop(e) {
		console.log('Dropped files', e.dataTransfer.files);
	},
};
