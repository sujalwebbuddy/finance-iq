import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TransactionModal from '../components/TransactionModal';
import ReceiptHeader from '../components/receipts/ReceiptHeader';
import ReceiptUpload from '../components/receipts/ReceiptUpload';
import ReceiptResult from '../components/receipts/ReceiptResult';
import { receiptsService } from '../services/receiptsService';
import { handleTransactionError } from '../utils/errorHandler';

const ReceiptsPage = () => {
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [receiptResult, setReceiptResult] = useState(null);
	const navigate = useNavigate();

	const [openEditReceiptResult, setOpenEditReceiptResult] = useState(false);
	const [categories, setCategories] = useState([]);
	const [isSaving, setIsSaving] = useState(false);

	// Fetch categories when component mounts
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoriesData = await receiptsService.getCategories();
				setCategories(categoriesData);
			} catch (err) {
				const receiptError = handleTransactionError(err, { action: 'fetchCategories' });
				toast.error(receiptError.message, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			}
		};

		fetchCategories();
	}, []);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			setReceiptResult(null);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) {
			toast.error('Please select a file to upload.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			return;
		}

		try {
			setUploading(true);
			const result = await receiptsService.uploadReceipt(file);
			setReceiptResult(result);
			setOpenEditReceiptResult(true);
			toast.success('Receipt uploaded successfully! Review and edit the extracted data.', {
				position: 'top-right',
				autoClose: 4000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		} catch (err) {
			const receiptError = handleTransactionError(err, { action: 'uploadReceipt' });
			toast.error(receiptError.message, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		} finally {
			setUploading(false);
		}
	};

	const handleEditReceiptSubmit = (formData) => {
		const updatedReceiptResult = {
			...receiptResult,
			extractedData: {
				merchant: formData.name,
				amount: parseFloat(formData.cost) || 0,
				category: formData.category,
				date: formData.addedOn,
				isIncome: formData.isIncome,
			},
		};

		setReceiptResult(updatedReceiptResult);
		setOpenEditReceiptResult(false);
	};

	const handleFinalSave = async () => {
		if (!receiptResult) return;

		try {
			setIsSaving(true);

			const transactionData = {
				name: receiptResult.extractedData.merchant,
				category: receiptResult.extractedData.category,
				cost: receiptResult.extractedData.amount,
				addedOn: receiptResult.extractedData.date,
				isIncome: receiptResult.extractedData.isIncome || false,
			};

			await receiptsService.saveTransactionFromReceipt(receiptResult._id, transactionData);

			toast.success('Transaction saved successfully!', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});

			setTimeout(() => navigate('/dashboard'), 1000);
		} catch (err) {
			const receiptError = handleTransactionError(err, { action: 'saveTransactionFromReceipt' });
			toast.error(receiptError.message, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		} finally {
			setIsSaving(false);
		}
	};

	const handleEditResult = () => {
		setOpenEditReceiptResult(true);
	};

	const handleNewCategory = (newCategory, isIncome) => {
		setCategories((prev) =>
			[...prev, { name: newCategory, isIncome }].sort((a, b) =>
				a.name.localeCompare(b.name)
			)
		);
	};

	const expenseCategories = categories
		.filter((cat) => !cat.isIncome)
		.map((cat) => cat.name || cat);
	const incomeCategories = categories
		.filter((cat) => cat.isIncome)
		.map((cat) => cat.name || cat);

	return (
		<>
			<ReceiptHeader />

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
				<ReceiptUpload
					file={file}
					uploading={uploading}
					onFileChange={handleFileChange}
					onSubmit={handleSubmit}
				/>

				<ReceiptResult
					receiptResult={receiptResult}
					isSaving={isSaving}
					onEdit={handleEditResult}
					onSave={handleFinalSave}
				/>
			</div>

			{openEditReceiptResult && receiptResult && (
				<TransactionModal
					isOpen={openEditReceiptResult}
					onClose={() => setOpenEditReceiptResult(false)}
					onSubmit={handleEditReceiptSubmit}
					transaction={{
						name: receiptResult.extractedData?.merchant || '',
						category: receiptResult.extractedData?.category || '',
						cost: receiptResult.extractedData?.amount || 0,
						addedOn:
							receiptResult.extractedData?.date ||
							new Date().toISOString().split('T')[0],
						isIncome: receiptResult.extractedData?.isIncome || false,
					}}
					expenseCategories={expenseCategories}
					incomeCategories={incomeCategories}
					onNewCategory={handleNewCategory}
				/>
			)}
		</>
	);
};

export default ReceiptsPage;
