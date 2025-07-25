'use client'

import React from 'react'
import { Material } from '@/types/product'
import Image from 'next/image'

interface MaterialDetailModalProps {
  material: Material
  isOpen: boolean
  onClose: () => void
}

export default function MaterialDetailModal({ material, isOpen, onClose }: MaterialDetailModalProps) {
  if (!isOpen) return null

  const renderRating = (rating: number | undefined, label: string) => {
    if (!rating) return null
    
    return (
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{label}</span>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= rating ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">{rating}/5</span>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {material.image && (
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10">
                    <Image
                      src={material.image}
                      alt={material.title}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-white">{material.title}</h3>
                  {material.category && (
                    <span className="bg-white/20 text-white text-sm px-2 py-1 rounded-full capitalize">
                      {material.category}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {material.description}
                  </p>
                </div>

                {/* Technical Specifications */}
                {material.technicalSpecs && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technical Specifications</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {material.technicalSpecs.composition && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Composition</span>
                          <span className="text-sm font-medium text-gray-900">{material.technicalSpecs.composition}</span>
                        </div>
                      )}
                      {material.technicalSpecs.weight && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Weight</span>
                          <span className="text-sm font-medium text-gray-900">{material.technicalSpecs.weight} GSM</span>
                        </div>
                      )}
                      {material.technicalSpecs.thickness && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Thickness</span>
                          <span className="text-sm font-medium text-gray-900">{material.technicalSpecs.thickness}mm</span>
                        </div>
                      )}
                      {material.technicalSpecs.finish && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Finish</span>
                          <span className="text-sm font-medium text-gray-900 capitalize">{material.technicalSpecs.finish}</span>
                        </div>
                      )}
                      {material.technicalSpecs.breathability && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Breathability</span>
                          <span className="text-sm font-medium text-gray-900 capitalize">{material.technicalSpecs.breathability}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Performance Ratings */}
                {material.properties && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Performance Ratings</h4>
                    <div className="space-y-3">
                      {renderRating(material.properties.waterproofRating, 'Waterproof')}
                      {renderRating(material.properties.uvResistanceRating, 'UV Resistance')}
                      {renderRating(material.properties.tearStrength, 'Tear Strength')}
                      {renderRating(material.properties.abrasionResistance, 'Abrasion Resistance')}
                    </div>
                  </div>
                )}

                {/* Special Features */}
                {material.properties && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Special Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {material.properties.fireRetardant && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Fire Retardant</span>
                      )}
                      {material.properties.antimicrobial && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Antimicrobial</span>
                      )}
                      {material.properties.antiStatic && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Anti-Static</span>
                      )}
                      {material.properties.pvcCoated && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">PVC Coated</span>
                      )}
                      {material.properties.wipeClean && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Wipe Clean</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Applications */}
                {material.applications && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Applications</h4>
                    <div className="space-y-4">
                      {material.applications.recommended && material.applications.recommended.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-green-700 mb-2">✓ Recommended For</h5>
                          <div className="flex flex-wrap gap-1">
                            {material.applications.recommended.map((use, index) => (
                              <span key={index} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {material.applications.notRecommended && material.applications.notRecommended.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-red-700 mb-2">✗ Not Recommended For</h5>
                          <div className="flex flex-wrap gap-1">
                            {material.applications.notRecommended.map((use, index) => (
                              <span key={index} className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded">
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${material.applications.indoorUse ? 'bg-green-500' : 'bg-gray-300'}`} />
                          Indoor Use
                        </div>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${material.applications.outdoorUse ? 'bg-green-500' : 'bg-gray-300'}`} />
                          Outdoor Use
                        </div>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${material.applications.commercialGrade ? 'bg-green-500' : 'bg-gray-300'}`} />
                          Commercial Grade
                        </div>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${material.applications.marineUse ? 'bg-green-500' : 'bg-gray-300'}`} />
                          Marine Use
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Care Instructions */}
                {material.careInstructions && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Care & Maintenance</h4>
                    <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                      {material.careInstructions.cleaning && (
                        <div>
                          <h5 className="text-sm font-medium text-blue-900">Cleaning</h5>
                          <p className="text-sm text-blue-800">{material.careInstructions.cleaning}</p>
                        </div>
                      )}
                      
                      {material.careInstructions.storage && (
                        <div>
                          <h5 className="text-sm font-medium text-blue-900">Storage</h5>
                          <p className="text-sm text-blue-800">{material.careInstructions.storage}</p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {material.careInstructions.washable && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Machine Washable</span>
                        )}
                        {material.careInstructions.dryCleanOnly && (
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Dry Clean Only</span>
                        )}
                        {material.careInstructions.bleachSafe && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Bleach Safe</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sustainability */}
                {material.sustainability && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Sustainability</h4>
                    <div className="bg-green-50 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${material.sustainability.recyclable ? 'bg-green-500' : 'bg-gray-300'}`} />
                          Recyclable
                        </div>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${material.sustainability.biodegradable ? 'bg-green-500' : 'bg-gray-300'}`} />
                          Biodegradable
                        </div>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${material.sustainability.ecoFriendly ? 'bg-green-500' : 'bg-gray-300'}`} />
                          Eco-Friendly
                        </div>
                        {material.sustainability.recycledContent && material.sustainability.recycledContent > 0 && (
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2 bg-green-500" />
                            {material.sustainability.recycledContent}% Recycled
                          </div>
                        )}
                      </div>

                      {material.sustainability.carbonFootprint && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-700">Carbon Footprint</span>
                          <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${
                            material.sustainability.carbonFootprint === 'low' ? 'bg-green-200 text-green-800' :
                            material.sustainability.carbonFootprint === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-red-200 text-red-800'
                          }`}>
                            {material.sustainability.carbonFootprint}
                          </span>
                        </div>
                      )}

                      {material.sustainability.sustainabilityCertifications && material.sustainability.sustainabilityCertifications.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-green-800 mb-1">Certifications</h5>
                          <div className="flex flex-wrap gap-1">
                            {material.sustainability.sustainabilityCertifications.map((cert, index) => (
                              <span key={index} className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Availability Information (without supplier details) */}
                {material.supplier && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Availability</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {material.supplier.leadTime && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Lead Time</span>
                          <span className="text-sm font-medium text-gray-900">{material.supplier.leadTime}</span>
                        </div>
                      )}
                      {material.supplier.stockLevel && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Availability</span>
                          <span className={`text-sm font-medium capitalize ${
                            material.supplier.stockLevel === 'in-stock' ? 'text-green-600' :
                            material.supplier.stockLevel === 'low-stock' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {material.supplier.stockLevel.replace('-', ' ')}
                          </span>
                        </div>
                      )}
                      {material.supplier.minimumOrder && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Minimum Order</span>
                          <span className="text-sm font-medium text-gray-900">{material.supplier.minimumOrder} sq ft</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {material.properties?.warranty && (
                  <div className="flex items-center text-blue-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{material.properties.warranty} Warranty</span>
                  </div>
                )}
                
                {material.seo?.featured && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    Featured Material
                  </span>
                )}
                
                {material.seo?.bestseller && (
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                    Bestseller
                  </span>
                )}
              </div>
              
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 