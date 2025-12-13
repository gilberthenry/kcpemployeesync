'use client';

import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { addDocument, getAllDocuments } from '@/app/services/firestore/util';

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

// Helper function to format document type
const formatDocumentType = (type) => {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const StatusCell = ({ status }) => {
  const statusConfig = {
    'Pending': { text: 'Pending', icon: <Clock size={14} />, className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    'Approved': { text: 'Approved', icon: <CheckCircle size={14} />, className: 'bg-green-100 text-green-700 border-green-200' },
    'Rejected': { text: 'Rejected', icon: <XCircle size={14} />, className: 'bg-red-100 text-red-700 border-red-200' },
  };
  const currentStatus = statusConfig[status] || statusConfig['Pending'];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${currentStatus.className}`}>
      {currentStatus.icon}
      <span className="ml-2">{currentStatus.text}</span>
    </span>
  );
};

export default function EmployeeDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      // Get user ID from localStorage or auth context
      const userId = localStorage.getItem('userId') || 'demo-user';
      const allDocs = await getAllDocuments('documents');
      // Filter documents for current user
      const userDocs = allDocs.filter(doc => doc.userId === userId);
      setDocuments(userDocs);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      alert('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !documentType) {
      alert('Please select a file and document type');
      return;
    }

    try {
      setUploading(true);
      
      // Get user ID from localStorage or auth context
      const userId = localStorage.getItem('userId') || 'demo-user';
      
      // Create document data (in production, you'd upload the file to Firebase Storage)
      const documentData = {
        userId,
        type: documentType,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        uploadedAt: new Date().toISOString(),
        status: 'Pending',
        rejectionReason: null
      };
      
      // Save to Firestore
      await addDocument('documents', documentData);
      alert('Document uploaded successfully!');
      
      // Reset form
      setSelectedFile(null);
      setDocumentType('');
      
      // Refresh documents list
      fetchDocuments();
    } catch (error) {
      console.error('Failed to upload document:', error);
      const errorMessage = error.message || 'Failed to upload document';
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Documents</h1>
        <p className="text-gray-600 mt-2">Upload and manage your personal and employment documents</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Upload className="h-6 w-6 mr-2 text-blue-600" />
          Upload New Document
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* File Upload Area */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Document File (PDF, PNG, JPG - Max 10MB)
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition-colors">
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                {selectedFile ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-800">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Document Type Selection */}
          <div>
            <label htmlFor="doc-type" className="block text-sm font-semibold text-gray-700 mb-3">
              Document Type *
            </label>
            <select
              id="doc-type"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              disabled={uploading}
            >
              <option value="">Select type...</option>
              <option value="birth_certificate">Birth Certificate</option>
              <option value="nbi_clearance">NBI Clearance</option>
              <option value="police_clearance">Police Clearance</option>
              <option value="medical_certificate">Medical Certificate</option>
              <option value="sss_id">SSS ID</option>
              <option value="philhealth_id">PhilHealth ID</option>
              <option value="pagibig_id">Pag-IBIG ID</option>
              <option value="tin_id">TIN ID</option>
              <option value="diploma">Diploma</option>
              <option value="transcript_of_records">Transcript of Records</option>
              <option value="other">Other</option>
            </select>
            
            <button
              onClick={handleUpload}
              disabled={uploading || !selectedFile || !documentType}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center transition-colors"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} className="mr-2" />
                  Upload Document
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Uploaded Documents</h2>
          <p className="text-sm text-gray-500 mt-1">View the status of your submitted documents</p>
        </div>
        
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading documents...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No documents uploaded yet</p>
            <p className="text-gray-400 text-sm mt-2">Upload your first document using the form above</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Document Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="font-medium text-gray-800">
                          {formatDocumentType(doc.type)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {formatDate(doc.uploadedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusCell status={doc.status} />
                    </td>
                    <td className="px-6 py-4">
                      {doc.status === 'Rejected' && doc.rejectionReason ? (
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-red-600">{doc.rejectionReason}</span>
                        </div>
                      ) : doc.status === 'Approved' ? (
                        <span className="text-sm text-green-600">Document verified</span>
                      ) : (
                        <span className="text-sm text-gray-500">Under review</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}