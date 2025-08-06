import Link from 'next/link';
import { FaYoutube, FaTwitter, FaShoppingBag, FaLink, FaInstagram, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const iconMap = {
  youtube: <FaYoutube />, twitter: <FaTwitter />, shop: <FaShoppingBag />,
  instagram: <FaInstagram />, facebook: <FaFacebook />, github: <FaGithub />,
  linkedin: <FaLinkedin />, default: <FaLink />,
};

export const LinkButton = ({ href, title, type = 'default', priority = false }) => {
  const icon = iconMap[type] || iconMap.default;

  const baseClasses = "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 font-semibold text-lg ring-1 ring-black/5";
  
  // Updated styles with dark mode variants
  const priorityClasses = "bg-purple-600 text-white hover:bg-purple-700 transform hover:-translate-y-1";
  const defaultClasses = "bg-white/80 text-purple-800 hover:bg-white dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700";

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className={`${baseClasses} ${priority ? priorityClasses : defaultClasses}`}>
        <span className="text-xl">{icon}</span>
        <span className="text-base">{title}</span>
      </div>
    </Link>
  );
};