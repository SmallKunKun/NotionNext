import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TagItemMini from './TagItemMini'

/**
 * 标签组
 * @param tags
 * @param currentTag
 * @returns {JSX.Element}
 * @constructor
 */
const TagGroups = ({ tags, currentTag }) => {
  if (!tags) return <></>
  return (
    <div id='tags-group' className='dark:border-gray-600 space-y-2'>
      <div className='font-light text-xs ml-2 mb-2'><FontAwesomeIcon icon={faTag} className='mr-1' />标签</div>
      <div className='px-4'>
      {
        tags.map(tag => {
          const selected = tag.name === currentTag
          return <TagItemMini key={tag.name} tag={tag} selected={selected} />
        })
      }
      </div>
    </div>
  )
}

export default TagGroups
