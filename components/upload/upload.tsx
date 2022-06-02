import React from 'react';
import { Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export interface ParchmentProps {
	uploadProps: UploadProps
}

const ParchmentUpload: React.FC<ParchmentProps> = ({uploadProps}) => (
	<Dragger {...uploadProps}>
		<p className="ant-upload-drag-icon">
			<InboxOutlined/>
		</p>
		<p className="ant-upload-text">Click or drag file to this area to upload</p>
		<p className="ant-upload-hint">
			Support for a single or bulk upload. Strictly prohibit from uploading company data or other
			band files
		</p>
	</Dragger>
);

export default ParchmentUpload
