import { ReactComponent as Bell } from '../assets/bell.svg'

interface NavProps {
  hasFailedMessages: boolean
}

const Nav: React.FC<NavProps> = ({ hasFailedMessages }) => (
  <div className="sticky top-0 z-50 flex justify-between items-center w-full h-52 bg-blue-500 p-9 shadow-lg">
    <div>
      <h1 className="text-white text-3xl font-bold">VG FX Logo</h1> {/* Add your logo or title here */}
    </div>
    {hasFailedMessages && (
      <button title="You have failed notifications">
        <Bell className="text-white" />
      </button>
    )}
  </div>
)

export default Nav
