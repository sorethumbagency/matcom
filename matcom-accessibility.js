document.addEventListener("DOMContentLoaded", () => {
 
  // Convert submenus and sub-submenus to lists 
  document.querySelectorAll(".header-nav-folder-content, .nested-folder.header-nav-folder-content").forEach(content => {
    content.outerHTML = `<ul class="${content.className}">${content.innerHTML}</ul>`;
  });

  document.querySelectorAll(".header-nav-folder-item, .nested-folder .header-nav-folder-item").forEach(item => {
    item.outerHTML = `<li class="${item.className}" style="list-style-type: none;">${item.innerHTML}</li>`;
  });

  // Keep accordion folder open in mobile view
  const subMenu = document.querySelector('.header-menu-nav-item--accordion-folder>a');
  const subMenuContent = document.querySelector('.accordion-folder-content');
  if (subMenu && subMenuContent) {
    subMenu.classList.add("open");
    subMenuContent.style.maxHeight = "226px";
  }

  // Highlight nested folder header on mouseover
  const nestedFolderHeader = document.querySelector('.header-nav-item--nested-folder > a');
  if (nestedFolderHeader) {
    nestedFolderLinks.forEach(item => {
      item.addEventListener('mouseover', () => {
        nestedFolderHeader.style.color = "white";
      });

      item.addEventListener('mouseout', () => {
        nestedFolderHeader.style.color = "";
      });
    });
  }
});
  
  // function to add an identical aria-label for all link that have the same href
     function appendToAriaLabelForSpecificHref(targetHref, textToAppend) {
            // Select all elements with an href attribute
            const elements = document.querySelectorAll('[href]');

            elements.forEach(element => {
                // Check if the element's href matches the target href
                if (element.getAttribute('href') === targetHref) {
                    // Get the current ARIA label
                    const currentAriaLabel = element.getAttribute('aria-label');

                    // Append the new text to the current ARIA label
                    const newAriaLabel = currentAriaLabel ? currentAriaLabel + textToAppend : textToAppend;

                    // Set the updated ARIA label back to the element
                    element.setAttribute('aria-label', newAriaLabel);
                }
            });
        }
  
  appendToAriaLabelForSpecificHref('tel:18882628266', 'Call us toll free');
  appendToAriaLabelForSpecificHref('mailto:info@matcom.com', ' Email us');
  appendToAriaLabelForSpecificHref('/', 'Home Page');
  appendToAriaLabelForSpecificHref('/about-matcom', 'About');
  appendToAriaLabelForSpecificHref('/about', 'Our Story');
  appendToAriaLabelForSpecificHref('/safety-and-quality-standards', 'Safety, Training & Quality');
  appendToAriaLabelForSpecificHref('/partners-causes', 'Our Partners & Causes');
  appendToAriaLabelForSpecificHref('/the-fleet', 'The Fleet');
  appendToAriaLabelForSpecificHref('/industries-we-serve', 'Industries We Serve');
  appendToAriaLabelForSpecificHref('/services', 'Services');
  appendToAriaLabelForSpecificHref('/machinery-moving', 'Machinery Moving');
  appendToAriaLabelForSpecificHref('/industrial-service', 'Industrial Service');
  appendToAriaLabelForSpecificHref('/warehousing-logistics', 'Warehousing & Logistics');
  appendToAriaLabelForSpecificHref('/repairs-upgrades', 'Repairs & Upgrades');
  appendToAriaLabelForSpecificHref('/parts-sales', 'Parts & Sales');
  appendToAriaLabelForSpecificHref('/fabrication', 'Fabrication');
  appendToAriaLabelForSpecificHref('/lubrication-systems', 'Lubrication Systems');
  appendToAriaLabelForSpecificHref('/contact-1', 'Contact');
  appendToAriaLabelForSpecificHref('/contact', 'Contact Us');
  appendToAriaLabelForSpecificHref('/careers', 'Careers');
  
  // if the attribute has this href replace instead of appending
 const instaLinks = document.querySelectorAll('a[href="https://www.instagram.com/matcom1976/"]');
instaLinks.forEach(link => {
    link.setAttribute('aria-label', 'Instagram');
});
  
  // function to append "(opens in a new tab)" to ARIA labels of elements with href target='_blank'
        function appendToAriaLabelForExternalLinks() {
            // Select all elements with an href attribute
            const elements = document.querySelectorAll('[href]');

            elements.forEach(element => {
                // Check if the element has target='_blank'
                if (element.getAttribute('target') === '_blank') {
                    // Define the text to append
                    const textToAppend = ' (opens in a new tab)';

                    // Get the current ARIA label
                    const currentAriaLabel = element.getAttribute('aria-label');

                    // Append the new text to the current ARIA label
                    const newAriaLabel = currentAriaLabel ? currentAriaLabel + textToAppend : textToAppend;

                    // Set the updated ARIA label back to the element
                    element.setAttribute('aria-label', newAriaLabel);
                }
            });
        }

        // Call the function to execute it
        appendToAriaLabelForExternalLinks();
  
  // give unique landmark to social links in footer
  const footerNav = document.querySelector('footer nav.sqs-svg-icon--list');
  if (footerNav) {
  footerNav.setAttribute("aria-label", "footer social links menu");
};
  
  // give unique landmark to social links on contact page
  const contactSocialNav = document.querySelector('#block-e2286f40cc7eefb7dafb nav.sqs-svg-icon--list');
   if (contactSocialNav){
    contactSocialNav.setAttribute("aria-label", "social media links");
  };

//give unique landmark to first map on contact page
window.onload = function() {
    const contactMap = document.querySelector('#block-336fde4c5f3638bc1683 > div > div > div:nth-child(2)');
    if (contactMap) {
        contactMap.setAttribute("aria-label", "Location Map");
    };
};