import React from 'react'
import '../index.css'

function ProjectItem(props) {
    const { projectDetails } = props
    const {imageURL ,title, description,projectId } = projectDetails
    
  return (
     <>
      <li className="project-item-container">
        <img
          className="project-item-image"
          src={imageURL}
          alt={`project-item${projectId}`}
        />
        <div className="project-item-details-container">
          <h1 className="project-item-title">{title}</h1>
          <p className="project-item-description">{description}</p>
        </div>
      </li>
    </>
  )
}

export default ProjectItem
