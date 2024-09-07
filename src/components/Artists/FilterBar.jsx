import React, {  useEffect, useState } from 'react';
import './FilterBar.css';
import sideBarGenre from '../Images/sidebar-genre.png';
import country from '../Images/earth.png';
import choices from '../Images/artists-choice.png';



const FilterBar = () => {

  const [isCollapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem('filterbarState');

    return savedState ? JSON.parse(savedState) : false;
  });

  const toggleSidebar = () => {
      const newCollapsedState = !isCollapsed;
      setCollapsed(newCollapsedState);
      localStorage.setItem('filterbarState', JSON.stringify(newCollapsedState));
    };

    const [expandedSections, setExpandedSections] = useState(() => {
      const savedSections = localStorage.getItem('expandedSection');
  
      return savedSections ? JSON.parse(savedSections) : {genre: false, country: false, choices: false };
    });
  
    const toggleSections = (section) => {
      const newSections = {
        ...expandedSections,
        [section]: !expandedSections[section],
      };
  
      setExpandedSections(newSections);
      localStorage.setItem('expandedSection', JSON.stringify(newSections));
    };

  useEffect(() => {
    const savedState = localStorage.getItem('filterbarState');
    if(savedState){
      setCollapsed(JSON.parse(savedState));
    }

    const savedSections = localStorage.getItem('expandedSection');
    if(savedSections) {
      setExpandedSections(JSON.parse(savedSections));
    }
  }, []);

  return (
    <>
        <aside id='sidebar' className={` ${isCollapsed ? 'expand' : ''}`}>
          <div className='d-flex'>
            <button className='toggle-btn' type='button' onClick={toggleSidebar}>
            <i class="lni lni-grid-alt"></i>
            </button>
            <div className='sidebar-playmus'>
              <a href='/'>PlayMus.</a>
            </div>
          </div>

          <ul className='sidebar-nav'>
            <li className='sidebar-item'>
              <a href='#' className='sidebar-link collapsed has-dropdown' data-bs-toggle='collapse' data-bs-target='#genre' aria-expanded='false' aria-controls='genre'
                onClick={() => toggleSections('genre')}>
                <img className='sidebar-images' src={sideBarGenre} alt='sidebar-genre' />
                <span>Genre</span>
              </a>
            {expandedSections.genre && (
              <ul id='genre' className='sidebar-dropdown list-unstyled' data-bs-parent='#sidebar'>

                <li className='sidebar-item'>
                  <a href='/artists/allartists/r&b' className='sidebar-link'>R&B</a>
                </li>

                <li className='sidebar-item'>
                  <a href='/artists/allartists/indie' className='sidebar-link'>Indie</a>
                </li>

                <li className='sidebar-item'>
                  <a href='/artists/allartists/hip-hop' className='sidebar-link'>Hip Hop</a>
                </li>

                <li className='sidebar-item'>
                  <a href='/artists/allartists/edm' className='sidebar-link'>EDM</a>
                </li>

                <li className='sidebar-item'>
                  <a href='/artists/allartists/rock' className='sidebar-link'>Rock</a>
                </li>

                <li className='sidebar-item'>
                  <a href='/artists/allartists/pop' className='sidebar-link'>Pop</a>
                </li>
              </ul>
            )}
            </li>

            <li className='sidebar-item'>
              <a href='#' className='sidebar-link collapsed has-dropdown' data-bs-toggle='collapse' data-bs-target='#country' aria-expanded='false' aria-controls='country'
                onClick={() => toggleSections('country')}>
                <img className='sidebar-images' src={country} alt='sidebar-country' />
                <span>Country</span>
              </a>
            {expandedSections.country && (
              <ul id='country' className='sidebar-dropdown list-unstyled' data-bs-parent='#sidebar'>
                <li className='sidebar-item'>
                  <a href='/artists/allartists/vietnam' className='sidebar-link'>Vietnam</a>
                </li>

                <li className='sidebar-item'>
                  <a href='/artists/allartists/us' className='sidebar-link'>US</a>
                </li>

                <li className='sidebar-item'>
                  <a href='/artists/allartists/uk' className='sidebar-link'>UK</a>
                </li>
              </ul>
            )}
            </li>

            <li className='sidebar-item'>
              <a href='#' className='sidebar-link collapsed has-dropdown' data-bs-toggle='collapse' data-bs-target='#choices' aria-expanded='false' aria-controls='choices'
                onClick={() => toggleSections('choices')}>
                <img className='sidebar-images' src={choices} alt='sidebar-choices' />
                <span>Top Choices</span>
              </a>

            {expandedSections.choices && (
              <ul id='choices' className='sidebar-dropdown list-unstyled' data-bs-parent='#sidebar'>
                <li className='sidebar-item'>
                  <a href='#' className='sidebar-link'>Week</a>
                </li>

                <li className='sidebar-item'>
                  <a href='#' className='sidebar-link'>Month</a>
                </li>

                <li className='sidebar-item'>
                  <a href='#' className='sidebar-link'>Year</a>
                </li>
              </ul>
            )}
            </li>
          </ul>

          <div class="sidebar-footer">
                <a href="/" class="sidebar-link">
                    <i class="lni lni-exit"></i>
                    <span>Back To Home</span>
                </a>
            </div>
        </aside>
    </>
  )
}

export default FilterBar