import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
  Flex,
} from '@chakra-ui/react'
export const Skeletons: React.FC = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="white" w={'100%'} m={10} p={10}>
      <Box>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Skeleton w={'40%'} h={32} />
          <Box w={'50%'}>
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
            <SkeletonCircle size="8" mt={4} />
          </Box>
        </Flex>
      </Box>
      <Box mt={10}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Skeleton w={'40%'} h={32} />
          <Box w={'50%'}>
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
            <SkeletonCircle size="8" mt={4} />
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
