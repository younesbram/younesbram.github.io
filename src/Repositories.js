import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RepoCard from './RepoCard';
import Pagination from './Pagination';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Repositories = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [reposPerPage, setReposPerPage] = useState(9);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageTransition, setPageTransition] = useState(false);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const { data } = await axios.get(
                    'https://api.github.com/users/younesbram/repos'
                );
                const reposWithTopics = await Promise.all(
                    data.map(async (repo) => {
                        const topics = await axios.get(
                            `https://api.github.com/repos/younesbram/${repo.name}/topics`,
                            {
                                headers: {
                                    Accept: 'application/vnd.github.mercy-preview+json',
                                },
                            }
                        );
                        return { ...repo, topics: topics.data.names };
                    })
                );
                setRepos(reposWithTopics);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchRepos();
    }, []);

    const indexOfLastRepo = currentPage * reposPerPage;
    const indexOfFirstRepo = indexOfLastRepo - reposPerPage;

    const filteredRepos = repos.filter((repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);

    const paginate = (pageNumber) => {
        setPageTransition(true);
        setTimeout(() => {
            setCurrentPage(pageNumber);
            setPageTransition(false);
        }, 500);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>
                <a
                    href='https://younes.ca'
                    target='_blank'
                    rel='noreferrer'
                    className='repo-title'
                >
                    Younes's Github Repos
                </a>
            </h1>
            <div className='search'>
                <input
                    type='text'
                    placeholder='Search Repositories...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <TransitionGroup component={null}>
                <CSSTransition
                    key={currentPage}
                    timeout={500}
                    classNames='page-transition'
                >
                    <div className='repositories'>
                        {currentRepos.map((repo) => (
                            <RepoCard key={repo.id} repo={repo} />
                        ))}
                    </div>
                </CSSTransition>
            </TransitionGroup>
            <Pagination
                reposPerPage={reposPerPage}
                totalRepos={filteredRepos.length}
                paginate={paginate}
            />
        </div>
    );
};

export default Repositories;
