<template>
    <div class="my-div">
        <div>
            <q-img src="../assets/logo.jpeg" width="200px" />
        </div>
        <q-card class="q-mt-lg" style="width: 500px;">
            <div class="q-pt-lg q-px-xl">
                <q-item class="column">
                    <q-item-label class="q-pb-lg" style="text-align: center!important;">Etapa {{ step }} de 3</q-item-label>
                    <q-linear-progress 
                        :value="getProgressValue" 
                        rounded 
                        animation-speed="600"
                        :style="myProgress" />
                </q-item>
            </div>
            <q-stepper 
                v-model="step" 
                ref="stepper"
                animated
            >
                <q-step
                    :name="1"
                    :done="step > 1"
                >
                    <q-item-label class="step_label q-py-sm">Torne-se um partner 🤝</q-item-label>

                    <div class="q-pt-lg q-px-xl">
                        <q-item-label>Email empresarial</q-item-label>
                        <q-input v-model="email" outlined dense type="email" />

                        <q-item-label class="q-pt-md">Empresa parceira</q-item-label>
                        <q-input v-model="company" outlined dense />
                    </div>
                </q-step>

                <q-step
                    :name="2"
                    :done="step > 2"
                >
                    <q-item-label class="step_label q-py-sm">Você está quase lá!</q-item-label>

                    <div class="q-pt-lg q-px-xl">
                        <div class="row" style="justify-content: space-between;">
                            <div class="column"> 
                                <q-item-label>Nome</q-item-label>
                                <q-input v-model="name" outlined dense />
                            </div>
                            <div class="column"> 
                                <q-item-label>Sobrenome</q-item-label>
                                <q-input v-model="surname" outlined dense />
                            </div>
                        </div>

                        <q-item-label class="q-pt-md">Telefone</q-item-label>
                        <q-input v-model="phone" outlined dense type="tel" />

                        <q-item-label class="q-pt-md">Cargo</q-item-label>
                        <q-input v-model="role" outlined dense />
                    </div>
                </q-step>

                <q-step :name="3">
                    <q-item-label class="step_label q-py-sm">Última etapa</q-item-label>

                    <div class="q-pt-lg q-px-xl">
                        <q-item-label>Email empresarial</q-item-label>
                        <q-input v-model="email" outlined dense type="email" />

                        <q-item-label class="q-pt-md">Empresa parceira</q-item-label>
                        <q-input v-model="company" outlined dense />
                    </div>
                </q-step>
            </q-stepper>
            <q-card-actions class="q-pt-sm" align="center">
                <div class="row actions-div">
                    <div 
                        class="column" 
                        :style="actionsSpace"
                    >
                        <q-btn
                            v-if="step > 1"
                            class="btn-color"
                            flat
                            @click="$refs.stepper.previous()"
                            label="Voltar"
                        />
                    </div>
                    <div class="column" :style="actionsSpace">
                        <q-btn
                            class="btn-color"
                            @click="step >= 3 ? createAccount() : $refs.stepper.next()"
                            :label="btnLabelStep"
                        />
                    </div>
                </div>
            </q-card-actions>
            <div class="q-pt-md q-pb-lg" style="text-align: center;">
                <span style="text-decoration: underline; cursor: pointer;"> ou acesse a sua conta</span>
            </div>
        </q-card>
    </div>
</template>

<script>
import { ref } from 'vue';
import { api } from '../boot/axios';

export default {
    data: function () {
        return {
            step: ref(1),
            name: null,
            role: null,
            phone: null,
            email: null,
            surname: null,
            company: null,
            progress: null
        }
    },
    mounted: function () {
        // this.name = '';
        // this.surname = '';
        // this.role = '';
        // this.email = '';
        // this.phone = '';
        // this.company = '';
    },
    computed: {
        btnLabelStep: function () {
            return this.step === 1 ? 'Iniciar' : this.step === 2 ? 'Avançar' : 'Concluir';
        },
        getProgressValue: function () {
            return this.step / 3;
        },
        myProgress: function () {
            return {
                height: '5px',
                color: this.step >= 3 ? '#45C9A5' : '#FF9A6B'
            }   
        },
        actionsSpace: function () {
            if (this.step <= 1) {
                return {
                    width: '100%'
                }
            }
            return {
                'max-width': '160px',
                width: '100%'
            }
        }
    },
    methods: {
        createAccount: async function() {
            try {
                this.$q.loading.show();

                const body = {
                    name: `${this.name} ${this.surname}`,
                    email: this.email,
                    phone: this.phone,
                    company: this.company
                };
                const { data } = await api.post('/gateway/account', body);
            } catch(e) {
                console.log(`Failed to create account: ${e.message}`);
            }

            this.$q.loading.hide();
        }
    },
}

// background: linear-gradient(90deg, rgba(255,154,107,1) 35%, rgba(255,126,128,1) 100%);
// background: linear-gradient(90deg, rgba(81,234,192,1) 35%, rgba(69,201,165,1) 100%);
</script>

<style lang="scss" scoped>
.my-div {
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left: -250px;
    margin-top: -200px;
}

.q-item__label {
    text-align: left;
}

.step_label {
    font-weight: 600; 
    font-size: 20px; 
    text-align: center;
}

.btn-color {
    background-color: #7700FF;
    color: white;
    height: 56px;
    width: 100%;
}

// ::v-deep .q-stepper__header--border {
//     border-bottom: none !important;
// }

:deep(.q-stepper__header) {
    visibility: hidden!important;
    height: 0px !important;
}

.actions-div {
    width: 100%;
    padding-left: 64px;
    padding-right: 64px;
    place-content: space-between;
}
</style>
