/** Replace sample entries with approved project photos and details. */
export const projects = [
  { title: 'Site preparation', category: 'Excavation', image: '/images/excavation-main.png', alt: 'Excavation equipment at a jobsite', placeholder: true },
  { title: 'Material hauling', category: 'Hauling', image: '/images/hero-main.png', alt: 'Mother Excavation dump truck fleet', placeholder: true },
  { title: 'Jobsite cleanup', category: 'Demolition & cleanup', image: '/images/about-main.png', alt: 'Mother Excavation equipment', placeholder: true },
];

/**
 * Media options:
 * { type: 'youtube', url: 'https://youtu.be/VIDEO_ID' }
 * { type: 'video', url: 'https://media.example.com/project.mp4', poster: '/images/project.jpg' }
 * { type: 'image', url: '/images/project.jpg', alt: 'Descriptive photo caption' }
 * Keep videos on YouTube or an external HTTPS media host; only URLs live here.
 */
export const recentWork = [
  { title: 'A closer look at the jobsite', category: 'Project video', description: 'Project footage coming soon.', media: null, placeholder: true },
  { title: 'From the field', category: 'Project photos', description: 'New project photos coming soon.', media: { type: 'image', url: '/images/hauling-main.png', alt: 'Equipment at a jobsite, used as a sample project image' }, placeholder: true },
];
