'use client'

import React from 'react'
import { Material } from '@/types/product'
import Image from 'next/image'

interface MaterialShowcaseCardProps {
  material: Material
  onClick: () => void
}

export default function MaterialShowcaseCard({ material, onClick }: MaterialShowcaseCardProps) {
  const renderPerformanceRating = (rating: number | undefined, label: string, icon: string) => {
    if (!rating) return null
    
    return (
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-600">{icon}</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i <= rating ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-gray-700">{rating}/5</span>
      </div>
    )
  }

  const getKeyFeatures = () => {
    const features: string[] = []
    const props = material.properties
    
    if (props?.waterproofRating && props.waterproofRating >= 4) features.push('Waterproof')
    if (props?.uvResistanceRating && props.uvResistanceRating >= 4) features.push('UV Resistant')
    if (props?.tearStrength && props.tearStrength >= 4) features.push('Heavy Duty')
    if (props?.fireRetardant) features.push('Fire Retardant')
    if (props?.antimicrobial) features.push('Antimicrobial')
    if (material.sustainability?.ecoFriendly) features.push('Eco-Friendly')
    if (material.applications?.marineUse) features.push('Marine Grade')
    
    return features.slice(0, 3)
  }

  const keyFeatures = getKeyFeatures()

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100">
        {material.image && (
          <Image
            src={material.image}
            alt={material.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 space-y-2">
          {material.seo?.featured && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
          {material.seo?.bestseller && (
            <span className="block bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              Bestseller
            </span>
          )}
          {material.seo?.newProduct && (
            <span className="block bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
        </div>

        {/* Clear Material Badge */}
        {material.hasColors === false && (
          <div className="absolute top-3 right-3">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
              Clear/Transparent
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full font-medium capitalize">
            {material.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title and Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {material.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {material.description}
          </p>
        </div>

        {/* Technical Specs Preview */}
        {material.technicalSpecs && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            {material.technicalSpecs.weight && (
              <div className="flex justify-between">
                <span className="text-gray-500">Weight:</span>
                <span className="font-medium">{material.technicalSpecs.weight} GSM</span>
              </div>
            )}
            {material.technicalSpecs.thickness && (
              <div className="flex justify-between">
                <span className="text-gray-500">Thickness:</span>
                <span className="font-medium">{material.technicalSpecs.thickness}mm</span>
              </div>
            )}
            {material.technicalSpecs.composition && (
              <div className="col-span-2 flex justify-between">
                <span className="text-gray-500">Material:</span>
                <span className="font-medium text-right">{material.technicalSpecs.composition}</span>
              </div>
            )}
          </div>
        )}

        {/* Performance Ratings */}
        <div className="space-y-2">
          {renderPerformanceRating(material.properties?.waterproofRating, 'Waterproof', '💧')}
          {renderPerformanceRating(material.properties?.uvResistanceRating, 'UV Resistant', '☀️')}
          {renderPerformanceRating(material.properties?.tearStrength, 'Durability', '💪')}
        </div>

        {/* Key Features */}
        {keyFeatures.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-1">
              {keyFeatures.map((feature, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Color Information */}
        <div className="border-t border-gray-100 pt-4">
          {material.hasColors === false ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Material Type:</span>
              <span className="text-sm font-medium text-blue-600">Clear/Transparent</span>
            </div>
          ) : material.colors && material.colors.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Available Colors:</span>
                <span className="text-sm font-medium text-gray-900">
                  {material.colors.length} option{material.colors.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {material.colors.slice(0, 6).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                {material.colors.length > 6 && (
                  <span className="text-xs text-gray-500">
                    +{material.colors.length - 6} more
                  </span>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Warranty Information */}
        {material.properties?.warranty && (
          <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-blue-900">
                {material.properties.warranty} Warranty
              </span>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="pt-2 border-t border-gray-100">
          <button className="w-full text-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
            View Details & Specifications →
          </button>
        </div>
      </div>
    </div>
  )
} 