export const ProfileImage = ({ src, alt }) => {
  return (
    <img
      src={src || "/profPic.png"}
      alt={alt}
      // Updated border for better theme compatibility
      className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mx-auto 
                 shadow-2xl border-4 border-white/30 dark:border-gray-800/50 
                 hover:scale-105 hover:shadow-2xl transition-all duration-300"
    />
  );
};