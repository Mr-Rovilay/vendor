
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';

const Dropdown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate(`/products?category=${category.title}`);
    setDropDown(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[270px] justify-between">
          All Categories
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[270px]">
        {categoriesData && categoriesData.map((category, index) => (
          <DropdownMenuItem 
            key={index}
            onClick={() => handleCategorySelect(category)}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            <img
              src={category.image_Url}
              alt={category.title}
              className="object-contain w-6 h-6 mr-3"
            />
            <span>{category.title}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
