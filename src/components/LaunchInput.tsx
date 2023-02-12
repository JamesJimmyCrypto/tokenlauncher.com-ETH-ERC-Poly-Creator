import { Box, Button, Center, FormControl, Input, Stack, Tooltip, VStack, HStack, Select, Checkbox, NumberInputField, NumberInput, Divider, Container } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { useState } from 'react'   
import { APP_BASE_URL, supportedChains } from '@/supportedChains'

export type Erc20LaunchDetails = {
  contractType: string
  name: string
  decimals: string
  symbol: string
  totalSupply: string
  owner: string
  mintable: string
  pausable: string
  burnable: string
  solidity: string
  abi: string
  bytecode: string
  compilerVersion: string
  contractAddress: string
  chainId: string
  email: string
}

function LaunchInput(params: any) {
  const [name, setName] = useState()
  const [decimals, setDecimals] = useState(18)
  const [blockchain, setBlockchain] = useState(4)
  const [symbol, setSymbol] = useState()
  const [totalSupply, setTotalSupply] = useState()
  const [mintable, setMintable] = useState(true)
  const [pausable, setPausable] = useState(true)
  const [uniswap, setUniswap] = useState(true)

  const [nameValidationError, setNameValidationError] = useState()
  const [symbolValidationError, setSymbolValidationError] = useState()
  const [supplyValidationError, setSupplyValidationError] = useState()

  const nameSymbolError = (value: string) => {
    if (value?.length > 32 || /^\d/.test(value) || !value || value.length === 0) {
      return 'Cant start with number'
    }
    return false
  }

  const supplyError = (value: string) => {
    if (!value || !/^\d+$/.test(value) || value.length > 50) {
      return 'Max 50 digits'
    }
    return false
  }
  
  const selectDecimalChoices = []
  const selectNetworkChoices = []

  // 0 - 35 decimal places allowed
  for (let i = 0; i < 36; i++) selectDecimalChoices.push(`${i} decimals`)

  for (let i = 0; i < supportedChains.length; i++) {
    if (supportedChains[i].id === 5) selectNetworkChoices.push(`${supportedChains[i].name} (Free)`)
    else if (supportedChains[i].id === 137) selectNetworkChoices.push(`${supportedChains[i].name} (Cheapest)`)
    else selectNetworkChoices.push(`${supportedChains[i].name}`)
  }

  // todo figure out the best way to pass launch params when we redirect
  // maybe a hex encoded string?
  const appUrlWithParms = `${APP_BASE_URL}?name=${name ?? ''}&symbol=${symbol ?? ''}&totalSupply=${totalSupply ?? ''}&decimals=${decimals ?? ''}&blockchain=${blockchain ?? ''}&mintable=${mintable ?? ''}&pausable=${pausable ?? ''}&uniswap=${uniswap ?? ''}`

  return (
    <>
      <Container w='fit-content' pt='0.5em'>
        <Center pt='1em' pb='1em'>
              <Text bgGradient='linear(to-l, #7928FF, #33CC80)' bgClip='text' fontWeight='bold' fontSize={'3xl'}>Create Token</Text>
        </Center>

        <HStack>
          <Tooltip label='Example: "My Eth Token"'>
            <FormControl borderColor={"gray.700"} isInvalid={!!nameValidationError}>
              <Input autoFocus={true} placeholder='Name'
                autoComplete='off'
                onChange={(event: any) => {
                  const error = nameSymbolError(event.target.value as any)
                  setNameValidationError(error as any)
                  setName(event.target.value)
                }}
              />
            </FormControl>
          </Tooltip>
          <Tooltip label='Example: "MET"'>
            <FormControl borderColor={"gray.700"} isInvalid={!!symbolValidationError}>
              <Input placeholder='Symbol'
                autoComplete='off'
                onChange={(event: any) => {
                  const error = nameSymbolError(event.target.value as any)
                  setSymbolValidationError(error as any)
                  setSymbol(event.target.value)
                }}
              />
            </FormControl>
          </Tooltip>
        </HStack>
        <HStack>
          <Tooltip label="Total number of tokens to create. Example: 5000000">
            <FormControl isInvalid={!!supplyValidationError}>
              <NumberInput borderColor={"gray.700"}>
                <NumberInputField placeholder='Total Supply'
                  autoComplete='off'
                  onChange={(event: any) => {
                    const error = supplyError(event.target.value as any)
                    setSupplyValidationError(error as any)
                    setTotalSupply(event.target.value)
                  }}
                />
              </NumberInput>
            </FormControl>
          </Tooltip>
          <Tooltip label='Decimal Precision. Example 4 Decimals will allow values as low as 0.0001'>
            <Select borderColor={"gray.700"} color='gray.500' defaultValue={18} variant='outline' onChange={(event: any) => {
              setDecimals(event.target.value)
            }}>
              {selectDecimalChoices.map((value, index) => (
                <option key={index} value={index}>{value}</option>
              ))}          </Select>
          </Tooltip>
        </HStack>

        <Box alignSelf='start' w={'100%'}>
          <Tooltip label='Select blockchain token will be deployed on.'>
            <Select borderColor={"gray.700"} value={blockchain} variant='outline' onChange={(event: any) => {
              setBlockchain(event.target.value)
            }}>
              {selectNetworkChoices.map((value, index) => (
                <option key={index} value={index}>{value}</option>
              ))}
            </Select>
          </Tooltip>
        </Box>
        <Center>
        <HStack mt='1em'>
            <HStack>
              <Checkbox isChecked={pausable} borderColor='gray.500' size='md' colorScheme='blue' onChange={(event) => setPausable(event.target.checked)}>
                Pausable
              </Checkbox>
            </HStack>
            <HStack>
              <Checkbox isChecked={mintable} borderColor='gray.500' size='md' colorScheme='blue' onChange={(event) => setMintable(event.target.checked)}>
                Mintable
              </Checkbox>
            </HStack>

          <HStack alignSelf={'flex-start'}>
            <Checkbox isChecked={uniswap} borderColor='gray.500' size='md' colorScheme='blue' onChange={(event) => setUniswap(event.target.checked)}>
              Add to Uniswap
            </Checkbox>
          </HStack>
        </HStack>
        </Center>
        <Center >
        <a target="_blank" rel="noopener noreferrer" href={appUrlWithParms}>
        <Button p='1.5em' mt='1em' colorScheme={'gray'}>
          <Text  fontSize='lg' fontWeight={'bold'} >Launch Token Now</Text>
        </Button>
        </a>
      </Center>
      </Container>
    </>
  );
}

export default LaunchInput


