// const sections_anchors_nav_bar = [
//     document.getElementById('section_1_anchor'),
//     document.getElementById('section_2_anchor'),
//     document.getElementById('section_3_anchor')];

const sections_anchors_nav_bar = [];

const sections = [
    document.getElementById('section1'),
    document.getElementById('section2'),
    document.getElementById('section3')];

const section_names = [];

function populateNavBar() {
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
    console.log(section_names);

}

populateNavBar();


function isElementVisible(el) {
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

const toggleNavVar = function (selected_index) {
    const class_name = 'nav__selected';
    // console.log('toogle', selected_index);
    if (selected_index == -1) {
        if (sections_anchors_nav_bar[0].classList.contains(class_name) && document.documentElement.scrollTop < 200)
            sections_anchors_nav_bar[0].classList.remove(class_name);
        return;
    }
    sections_anchors_nav_bar.forEach(function (value, index) {
        if (selected_index == index) {
            value.classList.add(class_name);
        } else {
            if (value.classList.contains(class_name)) {
                value.classList.remove(class_name);
            }
        }
    });
};

let shouldListenScroll = false;

const calmedScrollListener = function () {
    setTimeout(function () {
        shouldListenScroll = true;
    }, 200);
    if (shouldListenScroll) {
        shouldListenScroll = false;
        sections.forEach(function (value, index) {
            if (isElementVisible(value)) return toggleNavVar(index);
        });
        toggleNavVar(-1);
    }
};

document.addEventListener('scroll', calmedScrollListener, false);

sections_anchors_nav_bar.forEach(function (anchor, index) {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        sections[index].scrollIntoView();
        toggleNavVar(index);
    })

});

const dom_ready = function () {
    console.log('dom_ready');
};

document.addEventListener('DOMContentLoaded', dom_ready);
