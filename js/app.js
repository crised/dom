/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sections_anchors_nav_bar = [];
const section_names = [];

let sections = [];
let visible_p_sections = [];

let shouldListenScroll = false;


/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const isElementVisible = (el) => {
    const rect = el.getBoundingClientRect(),
        vWidth = window.innerWidth || document.documentElement.clientWidth,
        vHeight = window.innerHeight || document.documentElement.clientHeight,
        efp = function (x, y) {
            return document.elementFromPoint(x, y)
        };
    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0
        || rect.left > vWidth || rect.top > vHeight)
        return false;
    // Return true if any of its four corners are visible
    return (
        el.contains(efp(rect.left, rect.top))
        || el.contains(efp(rect.right, rect.top))
        || el.contains(efp(rect.right, rect.bottom))
        || el.contains(efp(rect.left, rect.bottom))
    );
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

const populateNavBar = () => {
    const navbar = document.getElementById('navbar__list');
    sections.forEach(function (section, index) {
        section_names.push(section.dataset.nav);
        const anchor = document.createElement('a');
        anchor.id = `section_${index + 1}_anchor`
        anchor.textContent = section.dataset.nav;
        anchor.href = '/';
        anchor.classList.add('nav__unselected');
        sections_anchors_nav_bar.push(anchor);
        const li = document.createElement('li');
        li.appendChild(anchor);
        navbar.appendChild(li);
    });
    sections_anchors_nav_bar.forEach((anchor, index) => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            sections[index].scrollIntoView();
            toggleNavVar(index);
        })
    });
}

const toggleNavVar = (selected_index) => {
    const startingTime = performance.now();
    const class_name = 'nav__selected';
    if (selected_index === -1) {
        if (sections_anchors_nav_bar[0].classList.contains(class_name) && document.documentElement.scrollTop < 200)
            sections_anchors_nav_bar[0].classList.remove(class_name);
        return;
    }
    sections_anchors_nav_bar.forEach((value, index) => {
        if (selected_index === index) {
            value.classList.add(class_name);
        } else {
            if (value.classList.contains(class_name)) {
                value.classList.remove(class_name);
            }
        }
    });
    const endingTime = performance.now();
    // console.log('toggleNavBar took ' + (endingTime - startingTime) + ' milliseconds.');
};

const calmedScrollListener = () => {
    setTimeout(function () {
        shouldListenScroll = true;
    }, 600);
    if (shouldListenScroll) {
        shouldListenScroll = false;
        visible_p_sections.forEach(function (value, index) {
            if (isElementVisible(value)) return toggleNavVar(index);
        });

        toggleNavVar(-1);
    }
};


/**
 * End Main Functions
 * Begin Events
 *
 */


/**
 * Nav Bar Function call
 */

const dom_ready = () => {
    sections = document.querySelectorAll('section');
    visible_p_sections = document.querySelectorAll('.section__paragraph');
    populateNavBar();
    document.addEventListener('scroll', calmedScrollListener, false);
};

document.addEventListener('DOMContentLoaded', dom_ready);


