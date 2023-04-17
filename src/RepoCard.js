import React from 'react';
import './RepoCard.css';

const RepoCard = ({ repo }) => {
  const handleWebsiteClick = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <div className='repo-card-container'>
      <div className='repository-card'>
        <a href={repo.html_url} target='_blank' rel='noreferrer' className='repo-link'>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
        </a>
        {repo.homepage && (
          <p className='website'>
            Website:{' '}
            <span
              className='website-link'
              onClick={(e) => handleWebsiteClick(e, repo.homepage)}
            >
              {repo.homepage}
            </span>
          </p>
        )}
        {repo.stargazers_count > 0 && (
          <p className='stars'>
            {repo.stargazers_count} <span role='img' aria-label='star'>⭐</span>
          </p>
        )}
        {repo.topics && repo.topics.length > 0 && (
          <div className='topics'>
            {repo.topics.map((topic, index) => (
              <span key={index} className='topic-bubble'>
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoCard;
