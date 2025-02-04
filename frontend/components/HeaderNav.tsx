export const HeaderNav = () => {
  return (
    <nav className='mx-4 border-b-2 border-gray-900 p-8 sm:w-[500px] sm:mx-10'>
      <ul>
        <li>
          <a
            href='/login'
            className='border border-solid p-4 bg-green-600 text-white rounded-sm'
          >
            Sign-In
          </a>
        </li>
      </ul>
    </nav>
  );
};
