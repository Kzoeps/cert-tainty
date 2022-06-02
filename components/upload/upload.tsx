import React from 'react';
import { Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export interface ParchmentProps {
	uploadProps: UploadProps,
	title?: string,
	description?: string
}

const ParchmentUpload: React.FC<ParchmentProps> = ({uploadProps, title, description}) => (
	<Dragger {...uploadProps}>
		<p className="ant-upload-drag-icon">
			<InboxOutlined/>
		</p>
		<p className="ant-upload-text">{title}</p>
		<p className="ant-upload-hint">
			{description}
		</p>
	</Dragger>
);
ParchmentUpload.defaultProps = {
	title: 'Click or drag file to this area to upload',
	description: 'Please upload your supporting documents for verification. Ex: School establishment certificate, MOE approval certificate'
}

export default ParchmentUpload
