<script>
	import { SimuladorInvestimentos } from '../api/main';
    import Input from './../components/input.svelte'
    import { IconMoneybag } from '@tabler/icons-svelte';
     let initialInvestment = '2000';
     let monthlyInvestment = '500';
     let yearlytax = '12';
     let period = '20';
     let brokerageFee = '';
     let isComeCotas = false;

     const handleSubmit = () => {
        if(brokerageFee == ''){
            brokerageFee = '0';
        }
        const simulator = new SimuladorInvestimentos(parseFloat(initialInvestment),parseFloat(monthlyInvestment),parseFloat(yearlytax),parseFloat(period),parseFloat(brokerageFee), isComeCotas)
        console.log(simulator);
        console.log(simulator.calcularJurosCompostos());
     }  
</script>
<div class="container p-4">
    <div class="flex items-center justify-center">
        <IconMoneybag size={80}/>
    </div>
    <h1 class="text-2xl mt-1">Simulador de Investimentos</h1>
    <p>Faça projeções sobre quanto seu dinheiro ira render, calculo de impostos e taxas de corretagens</p>
    <br/>
    {initialInvestment}
    <form on:submit|preventDefault={handleSubmit}>
        <Input type='number' bind:value={initialInvestment} name='initialInvestment' label='Valor Inicial' placeholder='Digite o valor inicial' required />
        <Input type='number' bind:value={monthlyInvestment} name='monthlyInvestment' label='Aporte mensal' placeholder='Digite o valor mensal' required />
        <Input type='number' bind:value={yearlytax} name='yearlytax' label='Juros anual' placeholder='Digite a taxa de juros anual' required />
        <Input type='number' bind:value={period} name='period' label='Quantos anos?' placeholder='Periodo do investimento' required />
        <Input type='number' bind:value={brokerageFee} name='brokerageFee' label='Taxa de custodia (Opcional)' placeholder='Digite a taxa de custodia do banco ou instituição financeira' />
        <label class="font-bold">
            <input type="checkbox" bind:checked={isComeCotas} />
            Seu investimento esta sujeito ao come cotas?(renda fixa, cambiais ou multimercados)
        </label>

        <div class="mx-auto text-center mt-5">
            <button class="w-full
            font-jakarta
            rounded-lg
            bg-blue-modernize hover:bg-blue-modernize-dark text-white 
            py-2.5
            px-4
            transition
            mb-2">Simular</button>
        </div>
        
    </form>
</div>

