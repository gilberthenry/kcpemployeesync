'use client';

import React, { useEffect, useState } from 'react';
import CurrentContractCard from '../../components/currentcontractcard/page';
import PastContractsTable from '../../components/pastcontractstable/page';
import CertificateRequestForm from '../../components/certificaterequestform/page';
import CertificateStatus from '../../components/certificatestatus/page';
import { addDocument, getAllDocuments } from '@/app/services/firestore/util';

export default function EmployeeContracts() {
  const [currentContract, setCurrentContract] = useState(null);
  const [pastContracts, setPastContracts] = useState([]);
  const [certificateRequests, setCertificateRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId') || 'demo-user';
      
      // Fetch all contracts
      const allContracts = await getAllDocuments('contracts');
      const userContracts = allContracts.filter(c => c.userId === userId);
      
      // Find current (active) contract
      const current = userContracts.find(c => c.status === 'active');
      setCurrentContract(current || null);
      
      // Get past contracts
      const past = userContracts.filter(c => c.status !== 'active');
      setPastContracts(past);
      
      // Fetch certificate requests
      const allCertRequests = await getAllDocuments('certificateRequests');
      const userCertRequests = allCertRequests.filter(r => r.userId === userId);
      setCertificateRequests(userCertRequests);
    } catch (error) {
      console.error('Failed to fetch contract data:', error);
      alert('Failed to load contract information');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadContract = async (contractId) => {
    try {
      // TODO: Replace with actual API call
      alert(`TODO: Download contract ${contractId}`);
    } catch (error) {
      console.error('Failed to download contract:', error);
      alert('Failed to download contract');
    }
  };

  const handleRequestCertificates = async (selectedCertificates) => {
    try {
      setSubmitting(true);
      const userId = localStorage.getItem('userId') || 'demo-user';
      
      const requestData = {
        userId,
        certificates: selectedCertificates,
        status: 'Pending',
        requestedAt: new Date().toISOString()
      };
      
      await addDocument('certificateRequests', requestData);
      alert('Certificate request submitted successfully!');
      
      // Refresh certificate requests
      const allCertRequests = await getAllDocuments('certificateRequests');
      const userCertRequests = allCertRequests.filter(r => r.userId === userId);
      setCertificateRequests(userCertRequests);
    } catch (error) {
      console.error('Failed to request certificates:', error);
      const errorMessage = error.message || 'Failed to submit certificate request';
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadCertificate = async (certificateId) => {
    try {
      // TODO: Replace with actual API call
      alert(`TODO: Download certificate ${certificateId}`);
    } catch (error) {
      console.error('Failed to download certificate:', error);
      alert('Failed to download certificate');
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-gray-50/50 min-h-screen">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading contract information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Contracts</h1>
        <p className="text-gray-500 mt-1">
          Manage your employment contracts and request certificates
        </p>
      </div>

      {/* Main Content - Stacked Sections */}
      <div className="space-y-8">
        {/* Current Contract Section */}
        <CurrentContractCard 
          contract={currentContract} 
          onDownload={handleDownloadContract}
        />

        {/* Past Contracts Section */}
        <PastContractsTable 
          contracts={pastContracts}
          onDownload={handleDownloadContract}
        />

        {/* Certificate Request Section */}
        <CertificateRequestForm 
          onSubmit={handleRequestCertificates}
          loading={submitting}
        />

        {/* Certificate Status Section */}
        <CertificateStatus 
          requests={certificateRequests}
          onDownload={handleDownloadCertificate}
        />
      </div>
    </div>
  );
}